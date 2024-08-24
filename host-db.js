// eslint-disable-next-line @typescript-eslint/no-require-imports
const liveServer = require('live-server')

liveServer.start({
  port: 8082,
  host: "localhost",
  root: "./db",
  open: false,
  cors: true
})
