import { writeFileSync } from "fs"
import { getDb } from "../db/get"
import { error } from "../../utils/error"

type GroupBy = keyof Exclude<ReturnType<typeof getDb>, undefined>["items"][0]

/** Groupping announcements by properties
 * @param groupBy name of object key it will group by
 */
const groupAnnouncements = (groupBy: GroupBy) => {
  const db = getDb()

  if (!db?.items) return
  return Object.groupBy(db?.items, (item) => item[groupBy as keyof typeof item])
}

export const saveGrouppedAnnouncements = () => {
  const groupped = groupAnnouncements("id")

  try {
    writeFileSync("./db/grouppedData.json", JSON.stringify(groupped))
  } catch {
    error("Something went wrong during saving groupped data")
  }
}
