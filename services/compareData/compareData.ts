import { ParsedAnnouncements } from "../parseAnnouncements/parseAnnouncements"

/** Use only for  primitive value*/
const compareValues = (oldValue: any, newValue: any) => oldValue === newValue

export type Announcement = Exclude<ParsedAnnouncements, undefined>[0]

export const announcedChanged = (oldAnnouncement: Announcement, newAnnouncement: Announcement) => {
  const oldPrice = oldAnnouncement.params.find(({ name }) => name === "price")
  const newPrice = newAnnouncement.params.find(({ name }) => name === "price")

  const oldTitle = oldAnnouncement.title
  const newTitle = newAnnouncement.title

  return oldPrice?.value !== newPrice?.value || oldTitle !== newTitle
}
