import { createBrowserRouter } from "react-router-dom"
import { Home, Offer, Archive } from "./pages"

export const paths = {
  home: "/",
  offer: "/offer/:offerId/:priceChange",
  archive: "/archive",
  archivedOffer: "/archive/:offerId",
} as const

export const router = createBrowserRouter([
  { path: paths.home, element: <Home /> },
  { path: paths.offer, element: <Offer /> },
  { path: paths.archive, element: <Archive /> },
  { path: paths.archivedOffer, element: <Offer /> },
])
