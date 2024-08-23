import { readFileSync } from "fs"
import { ParsedAnnouncements } from "../parseAnnouncements/parseAnnouncements"
import { error } from "../../utils/error"

interface DB {
  items: ParsedAnnouncements
}

export const getDb = (): DB | undefined => {
  try {
    return JSON.parse(readFileSync("./db/data.json").toString("utf8"))
  } catch {
    error("Something went wrong durig reading db")
  }
}
