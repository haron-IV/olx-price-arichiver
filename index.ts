import "dotenv/config"
import minimist from "minimist"
import type { Server } from "http"
import {
  getAnnouncements,
  getRequestHeaders,
  parseAnnouncements,
  saveChangedAnnouncements,
} from "@/services"
import { initApi } from "./api"

enum Flag {
  Dev = "dev",
}

const args = minimist(process.argv.slice(2))

const originalConsoleLog = console.log

console.log = (...args: unknown[]) => {
  const date = new Date().toUTCString()

  return originalConsoleLog(`[${date}]`, ...args)
}

const init = async (server?: Server) => {
  const headers = await getRequestHeaders()

  if (!headers!.authorization)
    throw new Error("Missed autth token try to rerun app or to test it manually")

  const announcements = await getAnnouncements(headers)
  if (announcements && typeof announcements !== "string")
    saveChangedAnnouncements(parseAnnouncements(announcements))

  server?.close()
}

switch (args[Flag.Dev]) {
  case "all":
  default: {
    const { server } = initApi()
    init(server)
    break
  }
  case "api":
    initApi()
    break
  case "app":
    init()
}
