import express from "express"
import {
  archiveOffer,
  getDb,
  getGrouppedAnnouncement,
  getGrouppedAnnouncements,
} from "@/services"

const dataRouter = express.Router()

dataRouter.get("/archive", (req, res) => {
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
  res.status(200)
})

export default dataRouter
