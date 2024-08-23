import type { Announcement } from "../index"

export const announcedChanged = (oldAnnouncement: Announcement, newAnnouncement: Announcement) => {
  const oldPrice = oldAnnouncement.params.find(({ name }) => name === "price")
  const newPrice = newAnnouncement.params.find(({ name }) => name === "price")

  const oldTitle = oldAnnouncement.title
  const newTitle = newAnnouncement.title

  return oldPrice?.value !== newPrice?.value || oldTitle !== newTitle
}
