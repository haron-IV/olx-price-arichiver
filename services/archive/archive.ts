import { getDb, setDb } from "../index"

export const archiveOffer = (offerId: string) => {
  const db = getDb()

  if (!db?.items) throw "No items"

  db.items = db?.items.map((item) => ({
    ...item,
    archived: item.archived || `${item.id}` === offerId,
  }))

  setDb(db, true)
}
