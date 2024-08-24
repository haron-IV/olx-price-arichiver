import { Card, Flex, Image, Tag } from "antd"
import { PropsWithChildren } from "react"
import { styled } from "styled-components"

const StyledCard = styled(Card)({
  ".ant-card-meta-title": { fontSize: 10 },
  ".ant-image-img": { maxHeight: 180, objectFit: "cover" },
})

interface EstateCardProps extends PropsWithChildren {
  /** url fot hte image */
  thumbnail?: string
  title: string
  /** Estate from private offer */
  privateEstate?: boolean
  price: string
  lastUpdate: string
}
const EstateCard = ({
  thumbnail,
  title,
  privateEstate,
  price,
  lastUpdate,
}: EstateCardProps) => {
  return (
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
          <Flex wrap gap="small">
            {privateEstate && <Tag color="green">Private offer</Tag>}
            <Tag>{price}</Tag>
            <Tag style={{ textWrap: "pretty" }}>Last update: {lastUpdate}</Tag>
          </Flex>
        }
      />
    </StyledCard>
  )
}

export default EstateCard
