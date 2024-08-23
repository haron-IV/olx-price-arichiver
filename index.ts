import "dotenv/config"
import { getAnnouncements } from "./services/getAnnouncements/getAnnouncements"
import { parseAnnouncements } from "./services/parseAnnouncements/parseAnnouncements"
import { saveChangedAnnouncements } from "./services/saveChangedAnnouncements/saveChangedAnnouncements"
import { saveGrouppedAnnouncements } from "./services/groupAnnouncements/groupAnnouncements"

const init = async () => {
  const announcements = await getAnnouncements()

  if (!announcements) return

  saveChangedAnnouncements(parseAnnouncements(announcements))
  const grouppedEntries = saveGrouppedAnnouncements()
}

init()
