import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchGrouppedDataItem } from "../utils/fetch-data"
import { clearPrice, sortNewestFirst } from "../utils"
import { Carousel, Divider, Flex, Tag, Typography } from "antd"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import styled from "styled-components"

type Data = Awaited<ReturnType<typeof fetchGrouppedDataItem> | undefined>
interface SlideProps {
  src?: string
}
const Slide = styled("div")<SlideProps>(({ src }) => ({
  width: "100%",
  height: 300,
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}))

const Offer = () => {
  const { offerId, priceChange } = useParams()
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const getData = async () => {
      const response = await fetchGrouppedDataItem(offerId)
      if (!response) return
      setData(sortNewestFirst(response))
    }
    getData()
  }, [])

  const prices = data
    ?.map(({ params, timestamp }) => ({
      price: clearPrice(
        params.find((param) => param.name === "Cena")?.value || "",
      ),
      date: new Date(timestamp).toLocaleDateString(),
    }))
    .reverse()

  return (
    <>
      <Carousel arrows autoplay style={{ minHeight: 300 }}>
        {data?.[0].photos.map((url) => <Slide key={url} src={url} />)}
      </Carousel>

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

        <LineChart
          width={500}
          height={350}
          data={prices}
          style={{ margin: "20px" }}
        >
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
      </div>
    </>
  )
}

export default Offer
