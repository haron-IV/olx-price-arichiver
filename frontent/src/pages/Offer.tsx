import { useEffect, useMemo, useState } from "react"
import { Link, useMatch, useParams } from "react-router-dom"
import { Divider, Flex, Tag, Typography } from "antd"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { GrouppedAnnouncements } from "@/services"
import { paths } from "router"
import { clearPrice, getArchivedDataItem, getGrouppedDataItem, sortNewestFirst } from "utils"
import { Map, Slider } from "components"

type Data = Exclude<GrouppedAnnouncements, undefined>[0] | undefined

const Offer = () => {
  const isArchivedOffer = useMatch(paths.archivedOffer)
  const { offerId, priceChange } = useParams()
  const [data, setData] = useState<Data>()

  useEffect(() => {
    ;(async () => {
      let response
      if (isArchivedOffer) response = await getArchivedDataItem(offerId)
      else response = await getGrouppedDataItem(offerId)
      if (!response) return
      setData(sortNewestFirst(response))
    })()
  }, [setData, isArchivedOffer, offerId])

  const prices = useMemo(
    () =>
      data
        ?.map(({ params, timestamp }) => ({
          price: clearPrice(params.find((param) => param.name === "Cena")?.value || ""),
          date: new Date(timestamp).toLocaleDateString(),
        }))
        .reverse(),
    [data],
  )

  return (
    <>
      <Slider photos={data?.[0].photos} />
      <Divider />
      <div style={{ margin: 10 }}>
        <Link to={data?.[0].url || ""}>
          <Typography.Title level={3}>{data?.[0].title}</Typography.Title>
        </Link>

        <Flex wrap gap="small" style={{ marginTop: 25 }}>
          {data?.[0].params.map(({ name, value }) => (
            <Tag color={name === "Cena" ? "blue" : "default"}>
              <b>{name}:</b> {value}
            </Tag>
          ))}
        </Flex>
        <Flex>
          <LineChart width={500} height={350} data={prices} style={{ margin: "20px" }}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={Number(priceChange) < 0 ? "green" : "red"}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <div style={{ width: 500, height: 350 }}>
            <Map points={[{ lng: data?.[0].map.lon || 0, lat: data?.[0].map.lat || 0 }]} />
          </div>
        </Flex>
      </div>
    </>
  )
}

export default Offer
