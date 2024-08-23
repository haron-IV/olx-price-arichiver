import { Announcements } from "../getAnnouncements"

export const parseAnnouncements = (announcements?: Announcements) =>
  announcements?.data?.map((item) => ({
    id: item.id,
    business: item.business,
    location: `${item.location.city.name}, ${item.location.district.name}`,
    map: item.map,
    params: item.params.map((param) => ({
      name: param.name,
      value: param.value.label,
    })),
    photos: item.photos.map((photo) => photo.link.split("s={")[0]),
    title: item.title,
    url: item.url,
  }))
