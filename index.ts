import "dotenv/config"
import { getAnnouncements } from "./services/getAnnouncements/getAnnouncements"
import { parseAnnouncements } from "./services/parseAnnouncements/parseAnnouncements"
import { saveChangedAnnouncements } from "./services/saveChangedAnnouncements/saveChangedAnnouncements"
import { groupAnnouncements } from "./services/groupAnnouncements/groupAnnouncements"

const init = async () => {
  const announcements = await getAnnouncements()

  if (!announcements) return

  saveChangedAnnouncements(parseAnnouncements(announcements))
  const grouppedEntries = groupAnnouncements("id")
  // console.log(grouppedEntries)
}

init()
