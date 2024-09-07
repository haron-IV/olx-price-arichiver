import { error } from "console"
import type { Me } from "./getMe.types"

export const getMe = async (headers?: Record<string, string>): Promise<Me | undefined | string> => {
  try {
    const response = await fetch("https://www.olx.pl/api/v1/users/me/", {
      headers: {
        accept: "*/*",
        "accept-language": "pl",
        authorization: headers!.authorization,
        priority: "u=1, i",
        "sec-ch-ua": '"Chromium";v="127", "Not)A;Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client": "DESKTOP",
        "x-device-id": headers!["x-device-id"],
        "x-fingerprint": headers!["x-fingerprint"],
        "x-platform-type": "mobile-html5",
        cookie: headers!.cookie,
        Referer: "https://www.olx.pl/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    })

    if (response.status !== 200) throw await response.json()

    return response.json() as unknown as Me
  } catch (err) {
    error("ERROR WHILE FETCHING ME: ", err)
    if (err && typeof err == "object" && "error" in err) return err.error as string
  }
}
