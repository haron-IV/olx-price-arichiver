import type { DB, GrouppedAnnouncements } from "../../../services"

export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8083/data/archive")
    return response.json() as Promise<DB>
  } catch {
    console.error(
      "Somethig went wroing during data fetching - make sure you host your dbs (pnpm host-db)",
    )
  }
}

export const fetchGrouppedData = async (): Promise<GrouppedAnnouncements> => {
  try {
    const response = await fetch("http://localhost:8083/data/grouppedData")
    return response.json() as Promise<GrouppedAnnouncements>
  } catch {
    console.error(
      "Somethig went wroing during data fetching - make sure you host your dbs (pnpm host-db)",
    )
  }
}

export const fetchGrouppedDataItem = async (id?: string) => {
  try {
    const response = await fetch(
      `http://localhost:8083/data/grouppedData/${id}`,
    )
    return response.json() as Promise<
      Exclude<GrouppedAnnouncements, undefined>[0]
    >
  } catch {
    console.error(
      "Somethig went wroing during data fetching - make sure you host your dbs (pnpm host-db)",
    )
  }
}
