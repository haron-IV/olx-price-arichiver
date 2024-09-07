import { error } from "console"
import { Me } from "./getMe.types"

export const getMe = async (token?: string): Promise<Me | undefined | string> => {
  try {
    const response = await fetch("https://www.olx.pl/api/v1/users/me/", {
      headers: {
        accept: "*/*",
        "accept-language": "pl",
        authorization: `Bearer ${token}`,
        priority: "u=1, i",
        "sec-ch-ua": '"Chromium";v="127", "Not)A;Brand";v="99"',
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
        Referer: "https://www.olx.pl/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    })

    if (response.status !== 200) throw await response.json()

    return (await response).json() as unknown as Me
  } catch (err) {
    error("ERROR WHILE FETCHING ME: ", err)
    if (err && typeof err == "object" && "error" in err) return err.error as string
  }
}
