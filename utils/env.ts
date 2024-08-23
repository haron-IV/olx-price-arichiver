export enum Env {}

export const getEnv = (name: Env) => {
  const env = process.env[name]
  if (!env) throw new Error(`there is no: ${name} env`)
  return env
}
