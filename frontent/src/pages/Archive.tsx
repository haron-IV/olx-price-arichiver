import { useEffect, useState } from "react"
import { Flex, Layout } from "antd"
import { GrouppedAnnouncements } from "@/services"
import { paths } from "router"
import { OfferCard } from "components"
import { getArchive, sortNewestFirst } from "utils"

const Archive = () => {
  const [data, setData] = useState<GrouppedAnnouncements>()

  useEffect(() => {
    ;(async () => {
      const data = await getArchive()
      setData(data)
    })()
  }, [])

  const entries = (data && Object.entries(data)) || []

  return (
    <Layout>
      <Flex wrap gap="middle">
        {entries.map(([key, items]) => {
          const sorted = sortNewestFirst<typeof items>(items || []) || []
          const oldestItem = sorted[sorted.length - 1]

          return (
            <OfferCard
              key={key}
              id={key}
              thumbnail={oldestItem.photos[0] || ""} // oldest photo to have consistency in displayed UI
              title={sorted[0].title || ""}
              privateEstate={!sorted[0].business}
              price={sorted[0].params.find((p) => p.name === "Cena")?.value || ""}
              lastUpdate={new Date(sorted[0].timestamp || 0).toUTCString()}
              oldestPrice={oldestItem.params.find((p) => p.name === "Cena")?.value || ""}
              redirectionPath={paths.archivedOffer}
            />
          )
        })}
      </Flex>
    </Layout>
  )
}

export default Archive
