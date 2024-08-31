import p, { Page } from "puppeteer"
import { NotificationCenter } from "node-notifier"
import path from "path"

const nc = new NotificationCenter()

const removeExpiredAccessToken = async (page: Page) => {
  const cookies = await page.cookies()
  const accessToken = cookies.find(({ name }) => name === "access_token")
  if (accessToken) await page.deleteCookie(accessToken)
  console.log("Expired token removed")
}

export const getToken = async (error?: boolean) => {
  const browser = await p.launch({
    headless: false,
    userDataDir: "./userData",
    args: [`--window-size=1200,900`],
    defaultViewport: { width: 1200, height: 900 },
  })
  const page = await browser.newPage()
  await page.goto("https://olx.pl", { waitUntil: "domcontentloaded" })

  if (error) {
    removeExpiredAccessToken(page)
    await page.reload({ waitUntil: "domcontentloaded" })
  }

  const cookies = await page.cookies()
  const accessToken = cookies.find(({ name }) => name === "access_token")

  if (accessToken?.value) {
    browser.close()
    return accessToken?.value
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
