import { timeStamp } from "console"
import { Announcements } from "../getAnnouncements"

const safeProperty = (property?: any) => property || ""

export const parseAnnouncements = (announcements: Announcements) =>
  announcements?.data?.map((item) => ({
    id: item.id,
    business: item.business,
    location: `${safeProperty(item?.location?.city?.name)}, ${safeProperty(item?.location?.district?.name)}`,
    map: safeProperty(item.map),
    params: item.params.map((param) => ({
      name: safeProperty(param.name),
      value: safeProperty(param.value.label),
    })),
    photos: item.photos.map((photo) => photo.link.split("s={")[0]),
    title: safeProperty(item.title),
    url: safeProperty(item.url),
    timestamp: new Date().getTime(),
  }))

export type ParsedAnnouncements = ReturnType<typeof parseAnnouncements>
