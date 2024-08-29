import { groupBy } from "@/utils"
import { getDb, setDb } from "../index"

/** @description Archives the offer */
export const archiveOffer = (offerId: string) => {
  const db = getDb()

  if (!db?.items) throw "No items"

  db.items = db?.items.map((item) => ({
    ...item,
    archived: item.archived || `${item.id}` === offerId,
  }))

  db.archivedIds.push(offerId)

  setDb(db, true)
}

export const getArchive = (groupped: boolean = true) => {
  const db = getDb()

  const archivedItems = db?.items.filter((item) => item.archived)

  if (!archivedItems) return []

  return groupped ? groupBy(archivedItems, "id") : archivedItems
}

export type Archive = ReturnType<typeof getArchive>
export const isGroupped = (archive: Archive): archive is ReturnType<typeof groupBy> =>
  typeof archive === "object" && !Array.isArray(archive)
