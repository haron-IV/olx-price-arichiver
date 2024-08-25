import { writeFileSync } from "fs"
import { error } from "@/utils"
import { type ParsedAnnouncements } from "../index"
import { DB, getDb } from "./get"

/**
 * @param entireData if passed it will overwrite entire database
 * @param path path to db file
 */
export const setDb = (
  data: ParsedAnnouncements | DB,
  entireData?: boolean,
  path: string = "./db/data.json",
) => {
  const db = getDb()
  if (!db?.items || !data) return
  const combined = entireData
    ? data
    : { items: [...db.items, ...(data as ParsedAnnouncements)] }
  try {
    writeFileSync(path, JSON.stringify(combined))
  } catch {
    error("Something went wrong during data saving")
  }
}
