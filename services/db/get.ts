import { readFileSync } from "fs"
import { error } from "@/utils"
import { ParsedAnnouncements } from "../index"

export interface DB {
  items: ParsedAnnouncements
  archivedIds: string[]
}

export const getDb = (): DB | undefined => {
  try {
    return JSON.parse(readFileSync("./db/data.json").toString("utf8"))
  } catch {
    error("Something went wrong durig reading db")
  }
}
