import { readFileSync, writeFileSync } from "fs"
import { error } from "@/utils"
import { getDb } from "../index"

type GroupBy = keyof Exclude<ReturnType<typeof getDb>, undefined>["items"][0]

/** Groupping announcements by properties
 * @param groupBy name of object key it will group by
 */
const groupAnnouncements = (groupBy: GroupBy) => {
  const db = getDb()

  if (!db?.items) return

  return Object.groupBy(db?.items, (item) => `${item[groupBy]}`)
}

export const saveGrouppedAnnouncements = () => {
  const groupped = groupAnnouncements("id")

  try {
    writeFileSync("./db/grouppedData.json", JSON.stringify(groupped))
  } catch {
    error("Something went wrong during saving groupped data")
  }
}

export const getGrouppedAnnouncements = () => {
  try {
    return JSON.parse(readFileSync("./db/grouppedData.json").toString("utf8"))
  } catch {
    error("Something wen wrong while fetching grouppedData")
  }
}

export type GrouppedAnnouncements = ReturnType<typeof groupAnnouncements>
