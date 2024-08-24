import { error } from "console"
import type { Announcements } from "./getAnnouncements.types"

export const getAnnouncements = async (): Promise<
  Announcements | string | undefined
> => {
  try {
    const response = await fetch(
      "https://www.olx.pl/api/v1/users/me/observed-ads/",
      {
        headers: {
          accept: "*/*",
          "accept-language": "pl",
          authorization: `Bearer ${process.env.TOKEN}`,
          priority: "u=1, i",
          "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-client": "DESKTOP",
          "x-device-id": `${process.env.X_DEVOCE_ID}`,
          "x-fingerprint": `${process.env.X_FINGERPRINT}`,
          "x-platform-type": "mobile-html5",
          cookie: `${process.env.COOKIE}`,
          Referer: "https://www.olx.pl/observed/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      },
    )

    if (response.status !== 200) throw await response.json()

    return (await response.json()) as Announcements
  } catch (err) {
    error("ERROR WHILE FETCHING:", err)
    if (err && typeof err == "object" && "error" in err)
      return err.error as string
  }
}
