import "dotenv/config"
import {
  getAnnouncements,
  getToken,
  parseAnnouncements,
  saveChangedAnnouncements,
} from "@/services"
import { initApi } from "./api"
import minimist from "minimist"
import type { Server } from "http"

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
  if (!process.env.TOKEN) await getToken()
  let announcements = await getAnnouncements()

  if (typeof announcements === "string" && announcements === "invalid_token") {
    await getToken()
    announcements = await getAnnouncements()
  }

  if (!announcements || typeof announcements === "string")
    throw "invalid token try to change it manually"

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
