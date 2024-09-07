import p, { type HTTPRequest, type Page } from "puppeteer"
import { NotificationCenter } from "node-notifier"
import path from "path"
import { getMe } from "../geMe/getMe"

const nc = new NotificationCenter()

const isTokenValid = async (token: string) => {
  try {
    const response = await getMe(token)
    return typeof response !== "string" && !!response
  } catch {
    return false
  }
}

const initPage = async () => {
  const browser = await p.launch({
    headless: false,
    userDataDir: "./userData",
    args: [`--window-size=1200,900`],
    defaultViewport: { width: 1200, height: 900 },
  })
  const page = await browser.newPage()
  await page.setRequestInterception(true)

  return { browser, page }
}

const requestInterceptor = (page: Page, callback: (interceptedRequest: HTTPRequest) => void) => {
  page.on("request", (interceptedRequest) => {
    callback(interceptedRequest)
    if (interceptedRequest.isInterceptResolutionHandled()) return
    else interceptedRequest.continue()
  })
}

export const getRequestHeaders = async () => {
  const { browser, page } = await initPage()
  let requests: HTTPRequest[] = []
  requestInterceptor(page, (interceptedRequest) => {
    const token = interceptedRequest.headers()["authorization"]
    if (token) requests = [...new Set([...requests, interceptedRequest])]
  })
  //https://www.olx.pl/observed/
  await page.goto("https://olx.pl", { waitUntil: "networkidle2" })

  const validReequestSettings: Record<string, string> = {}
  for await (const request of requests) {
    const isValid = await isTokenValid(request.headers()["authorization"].split(" ")[1].trim())
    if (isValid) Object.assign(validReequestSettings, request.headers())
  }

  if (validReequestSettings) {
    browser.close()
    return validReequestSettings
  } else
    nc.notify(
      {
        title: "ACTION NEEDED",
        message: "Browser showed. You have to log into your account to get token",
        icon: path.join(process.cwd(), "alert_icon.png"),
        sound: "",
        actions: "ok",
      },
      async (_, __, metadata) => {
        if (metadata?.activationValue === "ok") {
          const btn = await page.$("a::-p-text(Twoje konto)")
          await btn?.click()
        }
      },
    )
}
