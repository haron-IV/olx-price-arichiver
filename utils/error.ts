export const error = (msg: string) =>
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Error:
    ${msg}`,
  )
