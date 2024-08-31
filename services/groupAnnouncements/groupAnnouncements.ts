import { error, groupBy } from "@/utils"
import { type DB, getDb } from "../index"

type GroupBy = keyof Exclude<ReturnType<typeof getDb>, undefined>["items"][0]

/** Groupping announcements by properties
 * @param groupBy name of object key it will group by
 */
const groupAnnouncements = (db: DB, by: GroupBy, notArchived: boolean = true) => {
  if (!db?.items) return
  if (notArchived) db.items = db.items.filter((item) => !item.archived)

  return groupBy(db.items, by)
}
export type GrouppedAnnouncements = ReturnType<typeof groupAnnouncements>

export const getGrouppedAnnouncements = () => {
  const db = getDb()
  if (!db) throw "No database"
  return groupAnnouncements(db, "id")
}

export const getGrouppedAnnouncement = (id: string) => {
  try {
    const db = getDb()
    if (!db) throw "No database"
    return groupAnnouncements(db, "id")?.[id]
  } catch {
    error("Something wen wrong while fetching grouppedData")
  }
}
