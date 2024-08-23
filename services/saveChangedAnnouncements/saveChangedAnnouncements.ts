import { announcedChanged } from "../compareData/compareData"
import { getDb } from "../db/get"
import { saveDb } from "../db/set"
import { Announcements } from "../getAnnouncements"
import { ParsedAnnouncements } from "../parseAnnouncements/parseAnnouncements"

export const saveChangedAnnouncements = (newAnnouncements: ParsedAnnouncements) => {
  const db = getDb()
  if (!db?.items) return

  let changedEntries: ParsedAnnouncements = []

  //detect changed announcements
  db.items.forEach((oldAnnouncement) => {
    newAnnouncements?.forEach((newAnnouncement) => {
      const isEntryInDb = oldAnnouncement.id === newAnnouncement.id

      if (isEntryInDb && announcedChanged(oldAnnouncement, newAnnouncement))
        changedEntries = [...changedEntries, newAnnouncement]
    })
  })

  //detect new announcements
  const oldIds = db.items.map(({ id }) => `${id}`)
  newAnnouncements.forEach((newAnnouncement) => {
    if (!oldIds.includes(`${newAnnouncement.id}`)) changedEntries.push(newAnnouncement)
  })

  console.log(
    changedEntries.length > 0
      ? `Detected ${changedEntries.length} changes`
      : "Changes not detected",
  )

  saveDb([...db.items, ...changedEntries])
}
