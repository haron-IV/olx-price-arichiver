import { writeFileSync } from "fs"
import { error } from "@/utils"
import { type ParsedAnnouncements } from "../index"
import { getDb } from "./get"

export const setDb = (data: ParsedAnnouncements) => {
  const db = getDb()
  if (!db?.items || !data) return
  const combined = { items: [...db.items, ...data] }
  try {
    writeFileSync("./db/data.json", JSON.stringify(combined))
  } catch {
    error("Something went wrong during data saving")
  }
}
