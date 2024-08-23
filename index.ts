import "dotenv/config"
import { getAnnouncements } from "./services/getAnnouncements/getAnnouncements"
import { parseAnnouncements } from "./services/parseAnnouncements/parseAnnouncements"
import { getDb } from "./services/db/get"
import { saveDb } from "./services/db/set"
import { saveChangedAnnouncements } from "./services/saveChangedAnnouncements/saveChangedAnnouncements"

const init = async () => {
  const announcements = await getAnnouncements()

  if (!announcements) return

  saveChangedAnnouncements(parseAnnouncements(announcements))
}

init()
