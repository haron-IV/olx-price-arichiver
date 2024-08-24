import type { DB, GrouppedAnnouncements } from "../../../services"

export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8082/data.json")
    return response.json() as Promise<DB>
  } catch {
    console.error(
      "Somethig went wroing during data fetching - make sure you host your dbs (pnpm host-db)",
    )
  }
}

export const fetchGrouppedData = async (): Promise<GrouppedAnnouncements> => {
  try {
    const response = await fetch("http://localhost:8082/grouppedData.json")
    return response.json() as Promise<GrouppedAnnouncements>
  } catch {
    console.error(
      "Somethig went wroing during data fetching - make sure you host your dbs (pnpm host-db)",
    )
  }
}
