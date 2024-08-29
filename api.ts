import express, { type Express } from "express"
import { Env, getEnv } from "./utils"
import { dataRouter, archiveRouter } from "./endpoints"
import cors from "cors"

const registerRoutes = (app: Express) => {
  app.use("/data", dataRouter)
  app.use("/archive", archiveRouter)
}

export const initApi = () => {
  const app = express()
  app.use(cors({ origin: "http://localhost:3000" }))
  registerRoutes(app)

  const port = getEnv(Env.API_PORT)
  const server = app.listen(port, () => {
    console.log(`API is running on port ${port}`)
  })

  return { server }
}
