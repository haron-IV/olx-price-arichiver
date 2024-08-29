import { useEffect, useState } from "react"
import { getArchive } from "../utils/fetch-data"
import { Flex, Layout } from "antd"
import { sortNewestFirst } from "../utils"
import EstateCard from "../components/EstateCard"

// TODO:
const Archive = () => {
  const [data, setData] = useState()
  const [refresh, seRefresh] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const data = await getArchive()
      setData(data)
    }

    getData()
  }, [])

  const entries = (data && Object.entries(data)) || []

  return (
    <Layout>
      <Flex wrap gap="middle">
        {entries.map(([key, items]) => {
          const sorted = sortNewestFirst<typeof items>(items) || []
          const oldestItem = sorted[sorted.length - 1]

          return (
            <EstateCard
              key={key}
              id={key}
              thumbnail={oldestItem.photos[0] || ""} // oldest photo to have consistency in displayed UI
              title={sorted[0].title || ""}
              privateEstate={!sorted[0].business}
              price={sorted[0].params.find((p) => p.name === "Cena")?.value || ""}
              lastUpdate={new Date(sorted[0].timestamp || 0).toUTCString()}
              oldestPrice={oldestItem.params.find((p) => p.name === "Cena")?.value || ""}
              setRefresh={seRefresh}
            />
          )
        })}
      </Flex>
    </Layout>
  )
}

export default Archive
