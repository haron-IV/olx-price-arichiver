import { getDb } from "../db/get"

type GroupBy = keyof Exclude<ReturnType<typeof getDb>, undefined>["items"][0]

/** Groupping announcements by properties
 * @param groupBy name of object key it will group by
 */
export const groupAnnouncements = (groupBy: GroupBy) => {
  const db = getDb()

  if (!db?.items) return
  return Object.groupBy(db?.items, (item) => item[groupBy as keyof typeof item])
}
