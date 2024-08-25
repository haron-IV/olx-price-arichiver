import { error } from "@/utils"
import { getDb } from "../index"

type GroupBy = keyof Exclude<ReturnType<typeof getDb>, undefined>["items"][0]

/** Groupping announcements by properties
 * @param groupBy name of object key it will group by
 */
export const groupAnnouncements = (
  groupBy: GroupBy,
  notArchived: boolean = true,
) => {
  const db = getDb()

  if (!db?.items) return

  if (notArchived) db.items = db.items.filter((item) => !item.archived)

  return Object.groupBy(db?.items, (item) => `${item[groupBy]}`)
}

export const getGrouppedAnnouncement = (id: string) => {
  try {
    return groupAnnouncements("id")?.[id]
  } catch {
    error("Something wen wrong while fetching grouppedData")
  }
}

export type GrouppedAnnouncements = ReturnType<typeof groupAnnouncements>
