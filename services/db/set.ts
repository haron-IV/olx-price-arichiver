import { writeFileSync } from "fs"
import { ParsedAnnouncements } from "../parseAnnouncements/parseAnnouncements"
import { getDb } from "./get"
import { error } from "../../utils/error"

export const saveDb = (data: ParsedAnnouncements) => {
  const db = getDb()

  if (!db?.items || !data) return

  const combined = {
    items: [...db.items, ...data],
  }

  try {
    writeFileSync("./db/data.json", JSON.stringify(combined))
  } catch {
    error("Something went wrong during data saving")
  }
}
