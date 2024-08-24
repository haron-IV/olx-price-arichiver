import "dotenv/config"
import {
  getAnnouncements,
  getToken,
  parseAnnouncements,
  saveChangedAnnouncements,
  saveGrouppedAnnouncements,
} from "@/services"

const init = async () => {
  if (!process.env.TOKEN) await getToken()
  let announcements = await getAnnouncements()

  if (typeof announcements === "string" && announcements === "invalid_token") {
    await getToken()
    announcements = await getAnnouncements()
  }

  if (!announcements || typeof announcements === "string") return

  saveChangedAnnouncements(parseAnnouncements(announcements))
  saveGrouppedAnnouncements()
}

init()
