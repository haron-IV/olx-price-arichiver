import express from "express"
import { Env, getEnv } from "./utils"
import { dataRouter } from "./endpoints"
import cors from "cors"

export const initApi = () => {
  const app = express()
  app.use(cors({ origin: "http://localhost:3000" }))

  app.use("/data", dataRouter)

  const port = getEnv(Env.API_PORT)
  const server = app.listen(port, () => {
    console.log(`API is running on port ${port}`)
  })

  return { server }
}
