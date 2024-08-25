export enum Env {
  API_PORT = "API_PORT",
}

export const getEnv = (name: Env) => {
  const env = process.env[name]
  if (!env) throw new Error(`there is no: ${name} env`)
  return env
}
