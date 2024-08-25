import express from "express"
import {
  archiveOffer,
  getDb,
  getGrouppedAnnouncement,
  groupAnnouncements,
} from "@/services"

const dataRouter = express.Router()

dataRouter.get("/archive", (req, res) => {
  res.send(getDb())
})

dataRouter.get("/grouppedData", (req, res) => {
  res.send(groupAnnouncements("id"))
})

dataRouter.get("/grouppedData/:id", (req, res) => {
  res.send(getGrouppedAnnouncement(req.params.id))
})

dataRouter.delete("/grouppedData/:id/archive", (req, res) => {
  archiveOffer(req.params.id)
  res.status(200).send(true)
})

export default dataRouter
