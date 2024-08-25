import "dotenv/config"
import {
  getAnnouncements,
  getToken,
  parseAnnouncements,
  saveChangedAnnouncements,
} from "@/services"
import { initApi } from "./api"

const init = async () => {
  if (!process.env.TOKEN) await getToken()
  let announcements = await getAnnouncements()

  if (typeof announcements === "string" && announcements === "invalid_token") {
    await getToken()
    announcements = await getAnnouncements()
  }

  if (!announcements || typeof announcements === "string")
    throw "invalid token try to change it manually"

  saveChangedAnnouncements(parseAnnouncements(announcements))
}

// init()
initApi()
