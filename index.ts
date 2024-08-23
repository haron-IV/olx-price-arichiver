import "dotenv/config"
import { getAnnouncements } from "./services/getAnnouncements/getAnnouncements"
import { parseAnnouncements } from "./services/parseAnnouncements/parseAnnouncements"

const init = async () => {
  const announcements = await getAnnouncements()
  console.log(announcements)
  console.log(parseAnnouncements(announcements))
}

init()
