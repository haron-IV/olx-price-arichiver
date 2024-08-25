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
            Object.entries(data)?.map(([key, items]) => (
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

export default App
