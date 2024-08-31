import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { useEffect, useRef } from "react"

const poland = { lng: 19.4, lat: 52.15 }
const config = {
  center: [poland.lng, poland.lat] as maptilersdk.LngLatLike,
  zoom: 15,
}

interface MapProps {
  points: {
    lng: number
    lat: number
  }[]
}
const Map = ({ points }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  maptilersdk.config.apiKey = process.env.REACT_APP_MAP_API_KEY || ""

  useEffect(() => {
    if (map.current) return // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current || "",
      style: maptilersdk.MapStyle.STREETS,
      ...config,
    })
  }, [])

  useEffect(() => {
    if (!points) return

    points.forEach(({ lng, lat }) => {
      if (map.current)
        new maptilersdk.Marker({ color: "#4ECAB0", opacity: "0.8" })
          .setLngLat([lng, lat])
          .addTo(map.current)
      map.current?.jumpTo({ center: [lng, lat] })
    })
  }, [points])

  return (
    <div className="map-wrap" style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainer} className="map" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

export default Map
