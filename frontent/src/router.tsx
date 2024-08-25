import { createBrowserRouter } from "react-router-dom"
import { Home, Offer } from "./pages"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/offer/:offerId", element: <Offer /> },
])
