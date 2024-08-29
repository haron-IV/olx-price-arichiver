import type { DB, GrouppedAnnouncements } from "../../../services"

const API_URL = process.env.REACT_APP_API_URL

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`)
    return response.json() as Promise<DB>
  } catch {
    console.error("Somethig went wroing during data fetching ")
  }
}

export const fetchGrouppedData = async (): Promise<GrouppedAnnouncements> => {
  try {
    const response = await fetch(`${API_URL}/data/grouppedData`)
    return response.json() as Promise<GrouppedAnnouncements>
  } catch {
    console.error("Somethig went wroing during data fetching")
  }
}

export const fetchGrouppedDataItem = async (id?: string) => {
  try {
    const response = await fetch(`${API_URL}/data/grouppedData/${id}`)
    return response.json() as Promise<Exclude<GrouppedAnnouncements, undefined>[0]>
  } catch {
    console.error("Somethig went wroing during data fetching ")
  }
}

export const archiveOffer = async (offerId: string) => {
  try {
    const response = await fetch(`${API_URL}/data/grouppedData/${offerId}/archive`, {
      method: "delete",
    })
    return response.json()
  } catch {
    console.error("Somethig went wroing during archiving data")
  }
}

export const getArchive = async (groupped: boolean = true): Promise<GrouppedAnnouncements> => {
  try {
    const response = await fetch(`${API_URL}/archive?groupped=${groupped}`)
    return response.json() as Promise<GrouppedAnnouncements>
  } catch {
    console.error("Somethig went wroing during archiving data")
  }
}

export const fetchArchivedDataItem = async (id?: string) => {
  try {
    const response = await fetch(`${API_URL}/archive/${id}`)
    return response.json() as Promise<Exclude<GrouppedAnnouncements, undefined>[0]>
  } catch {
    console.error("Somethig went wroing during data fetching ")
  }
}
