import "dotenv/config"
import { getAnnouncements } from "./services/getAnnouncements/getAnnouncements"
import { parseAnnouncements } from "./services/parseAnnouncements/parseAnnouncements"
import { saveChangedAnnouncements } from "./services/saveChangedAnnouncements/saveChangedAnnouncements"
import { saveGrouppedAnnouncements } from "./services/groupAnnouncements/groupAnnouncements"
import { getToken } from "./services/getToken/init"

const init = async () => {
  let announcements = await getAnnouncements()

  if (typeof announcements === "string" && announcements === "invalid_token") {
    await getToken()
    announcements = await getAnnouncements()
  }
  if (!announcements || typeof announcements === "string") return

  saveChangedAnnouncements(parseAnnouncements(announcements))
  const grouppedEntries = saveGrouppedAnnouncements()
}

init()
