import express from "express"
import { getDb, getGrouppedAnnouncements } from "@/services"

const dataRouter = express.Router()

dataRouter.get("/archive", (req, res) => {
  res.send(getDb())
})

dataRouter.get("/grouppedData", (req, res) => {
  res.send(getGrouppedAnnouncements())
})

export default dataRouter
