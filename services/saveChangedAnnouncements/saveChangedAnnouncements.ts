import { announcedChanged, getDb, setDb, type ParsedAnnouncements } from "../index"

export const saveChangedAnnouncements = (newAnnouncements: ParsedAnnouncements) => {
  const db = getDb()
  if (!db?.items) return

  let changedEntries: ParsedAnnouncements = []

  //detect new announcements
  const oldIds = db.items.map(({ id }) => `${id}`)
  newAnnouncements.forEach((newAnnouncement) => {
    if (
      oldIds.includes(`${newAnnouncement.id}`) ||
      db.archivedIds.includes(`${newAnnouncement.id}`)
    )
      return
    changedEntries.push({ ...newAnnouncement, timestamp: new Date().getTime() })
  })

  // detect changed announcements
  db.items.forEach((oldAnnouncement) => {
    newAnnouncements?.forEach((newAnnouncement) => {
      const isEntryInDb = oldAnnouncement.id === newAnnouncement.id

      if (isEntryInDb && announcedChanged(oldAnnouncement, newAnnouncement))
        changedEntries = [
          ...changedEntries,
          { ...newAnnouncement, timestamp: new Date().getTime() },
        ]
    })
  })

  const changesDetected = changedEntries.length > 0

  console.log(
    changesDetected ? `Detected ${changedEntries.length} changes.` : "Changes not detected",
  )

  if (!changesDetected) return
  setDb(changedEntries)
}
