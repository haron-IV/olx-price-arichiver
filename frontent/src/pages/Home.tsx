import { useEffect, useState } from "react"
import { GrouppedAnnouncements } from "../../../services"
import { fetchGrouppedData } from "../utils/fetch-data"
import { isDefined, sortNewestFirst } from "../utils"
import { Flex, Layout } from "antd"
import EstateCard from "../components/EstateCard"
import { paths } from "src/router"

const Home = () => {
  const [data, setData] = useState<GrouppedAnnouncements>()
  const [refresh, seRefresh] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGrouppedData()
      setData(data)
    }

    getData()
  }, [refresh])

  const entries = (data && Object.entries(data)) || []
  type Entries = (typeof entries)[0][1]
  const dataEntries = entries.map(([key, entries]: [string, Entries]) => {
    return [key, entries?.filter(isDefined)]
  }) as [string, Exclude<Entries, undefined>][]

  return (
    <div className="App">
      <Layout>
        <Flex wrap gap="middle">
          {dataEntries.map(([key, items]) => {
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
                redirectionPath={paths.offer}
              />
            )
          })}
        </Flex>
      </Layout>
    </div>
  )
}

export default Home
