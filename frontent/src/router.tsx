import { createBrowserRouter } from "react-router-dom"
import { Home, Offer } from "./pages"

export const paths = {
  home: "/",
  offer: "/offer/:offerId/:priceChange",
}

export const router = createBrowserRouter([
  { path: paths.home, element: <Home /> },
  { path: paths.offer, element: <Offer /> },
])
