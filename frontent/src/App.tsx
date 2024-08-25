import { Flex, Layout } from "antd"
import { useEffect, useState } from "react"
import { GrouppedAnnouncements } from "../../services"
import EstateCard from "./components/EstateCard"
import { fetchGrouppedData } from "./utils/fetch-data"

function App() {
  const [data, setData] = useState<GrouppedAnnouncements | undefined>()

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGrouppedData()
      setData(data)
    }

    getData()
  }, [])

  return (
    <div className="App">
      <Layout>
        <Flex wrap justify="space-between" gap="middle">
          {data &&
            Object.entries(data)?.map(([key, entries]) => (
              <EstateCard
                key={key}
                thumbnail={entries?.[0].photos[0] || ""}
                title={entries?.[0].title || ""}
                privateEstate={!entries?.[0].business}
                price={
                  entries?.[0].params.find((p) => p.name === "Cena")?.value ||
                  ""
                }
                lastUpdate={new Date(entries?.[0].timestamp || 0).toUTCString()}
              />
            ))}
        </Flex>
      </Layout>
    </div>
  )
}

export default App
