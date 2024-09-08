import { getDb, getGrouppedAnnouncements, setDb, type ParsedAnnouncements } from "../index"

export const saveChangedAnnouncements = (newAnnouncements: ParsedAnnouncements) => {
  const db = getDb()
  if (!db?.items) return

  const changedEntries: ParsedAnnouncements = []

  const grouppedOld = getGrouppedAnnouncements()

  newAnnouncements.forEach((newItem) => {
    if (!grouppedOld) return

    const itemsToCheck = grouppedOld[newItem.id]

    if (!itemsToCheck) changedEntries.push(newItem) // new entry - no id in db

    const noChanges = !!itemsToCheck?.find(
      (item) =>
        item.params.find(({ name }) => name === "Cena")?.value ===
        newItem.params.find(({ name }) => name === "Cena")?.value,
    )

    if (noChanges) return

    changedEntries.push(newItem)
  })

  const changesDetected = changedEntries.length > 0

  console.log(
    changesDetected ? `Detected ${changedEntries.length} changes.` : "Changes not detected",
  )

  if (!changesDetected) return
  setDb(changedEntries)
}
