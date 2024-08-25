import type { Announcements } from "../index"

const safeProperty = <T>(property?: T): T => property || ("" as T)

export const parseAnnouncements = (announcements: Announcements) =>
  announcements?.data?.map((item) => ({
    id: item.id,
    title: safeProperty(item.title),
    location: `${safeProperty(item?.location?.city?.name)}, ${safeProperty(item?.location?.district?.name)}`,
    params: item.params.map((param) => ({
      name: safeProperty(param.name),
      value: safeProperty(param.value.label),
    })),
    business: item.business,
    map: safeProperty(item.map),
    photos: item.photos.map((photo) => photo.link.split("s={")[0]),
    url: safeProperty(item.url),
    timestamp: new Date().getTime(),
    archived: false,
  }))

export type ParsedAnnouncements = ReturnType<typeof parseAnnouncements>
export type Announcement = Exclude<ParsedAnnouncements, undefined>[0]
