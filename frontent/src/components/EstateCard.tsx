import { Card, Flex, Image, Tag, Typography } from "antd"
import { PropsWithChildren } from "react"
import { styled } from "styled-components"
import { Link, generatePath } from "react-router-dom"
import { paths } from "../router"
import { clearPrice } from "../utils"

const StyledCard = styled(Card)({
  ".ant-card-meta-title": { fontSize: 10 },
  ".ant-image-img": { maxHeight: 180, objectFit: "cover" },
})

interface EstateCardProps extends PropsWithChildren {
  id: string
  /** url for the image */
  thumbnail?: string
  title: string
  /** Estate from private offer */
  privateEstate?: boolean
  price: string
  lastUpdate: string
  oldestPrice: string
}
const EstateCard = ({
  id,
  thumbnail,
  title,
  privateEstate,
  price,
  lastUpdate,
  oldestPrice,
}: EstateCardProps) => {
  const noPriceChange = oldestPrice === price
  const priceChange = clearPrice(price) - clearPrice(oldestPrice)

  return (
    <Link to={generatePath(paths.offer, { offerId: id, priceChange })}>
      <StyledCard
        hoverable
        cover={<Image preview={false} src={thumbnail} />}
        style={{
          width: 250,
        }}
      >
        <Card.Meta
          title={title}
          description={
            <>
              <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>
                {price}
              </Typography.Title>
              <Flex wrap gap="small">
                {privateEstate && <Tag color="green">Private offer</Tag>}
                {noPriceChange ? (
                  <Tag color="green-inverse">No price change</Tag>
                ) : (
                  <Tag
                    color={priceChange < 0 ? "green" : "error"}
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <b>Price Change:</b>
                    <span>
                      {oldestPrice} {"->"} {price}
                    </span>
                  </Tag>
                )}

                <Tag style={{ textWrap: "pretty" }}>
                  <b>Last update:</b> {lastUpdate}
                </Tag>
              </Flex>
            </>
          }
        />
      </StyledCard>
    </Link>
  )
}

export default EstateCard
