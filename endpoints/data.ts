import express from "express"
import { archiveOffer, getDb, getGrouppedAnnouncement } from "@/services"
import { getGrouppedAnnouncements } from "@/services/groupAnnouncements/groupAnnouncements"
import { getArchive, isGroupped } from "@/services/archive/archive"
import { GetArchiveParams } from "./data.types"
import { groupBy } from "@/utils"

export const dataRouter = express.Router()

dataRouter.get("/", (req, res) => {
  res.send(getDb())
})

dataRouter.get("/grouppedData", (req, res) => {
  res.send(getGrouppedAnnouncements())
})

dataRouter.get("/grouppedData/:id", (req, res) => {
  res.send(getGrouppedAnnouncement(req.params.id))
})

dataRouter.delete("/grouppedData/:id/archive", (req, res) => {
  archiveOffer(req.params.id)
  res.status(200).send(true)
})

// ARCHIVE
export const archiveRouter = express.Router()

archiveRouter.get<unknown, unknown, unknown, GetArchiveParams>("/", (req, res) => {
  const archive = getArchive(JSON.parse(req.query.groupped))
  res.send(archive)
})

archiveRouter.get<{ offerId: string }, unknown, unknown, GetArchiveParams>(
  "/:offerId",
  (req, res) => {
    const archive = getArchive(true)
    if (!archive || !req.params.offerId) return {}
    if (isGroupped(archive)) res.send((archive as ReturnType<typeof groupBy>)?.[req.params.offerId])
  },
)
