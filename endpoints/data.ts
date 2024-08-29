import express from "express"
import { archiveOffer, getDb, getGrouppedAnnouncement } from "@/services"
import { getGrouppedAnnouncements } from "@/services/groupAnnouncements/groupAnnouncements"
import { getArchive } from "@/services/archive/archive"
import { GetArchiveParams } from "./data.types"

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
