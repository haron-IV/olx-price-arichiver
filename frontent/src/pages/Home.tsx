import { useEffect, useState } from "react"
import { GrouppedAnnouncements } from "../../../services"
import { fetchGrouppedData } from "../utils/fetch-data"
import { isDefined } from "../utils"
import { Flex, Layout } from "antd"
import EstateCard from "../components/EstateCard"

const Home = () => {
  const [data, setData] = useState<GrouppedAnnouncements>()

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGrouppedData()
      setData(data)
    }

    getData()
  }, [])
  const entries = (data && Object.entries(data)) || []
  type Entries = (typeof entries)[0][1]
  const dataEntries = entries.map(([key, entries]: [string, Entries]) => {
    return [key, entries?.filter(isDefined)]
  }) as [string, Exclude<Entries, undefined>][]

  return (
    <div className="App">
      <Layout>
        <Flex wrap justify="space-between" gap="middle">
          {dataEntries.map(([key, items]) => (
            <EstateCard
              key={key}
              thumbnail={items?.[0].photos[0] || ""}
              title={items?.[0].title || ""}
              privateEstate={!items?.[0].business}
              price={
                items?.[0].params.find((p) => p.name === "Cena")?.value || ""
              }
              lastUpdate={new Date(items?.[0].timestamp || 0).toUTCString()}
            />
          ))}
        </Flex>
      </Layout>
    </div>
  )
}

export default Home
