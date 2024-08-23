import p from "puppeteer"

export const getToken = async () => {
  const browser = await p.launch({
    headless: false,
    userDataDir: "./userData",
  })
  const page = await browser.newPage()
  await page.goto("https://olx.pl/")
  const cookies = await page.cookies()
  const accessToken = cookies.find(({ name }) => name === "access_token")

  process.env.TOKEN = accessToken?.value // set token to env

  // await browser.close()
}
