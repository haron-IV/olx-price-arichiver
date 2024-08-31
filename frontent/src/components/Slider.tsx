import { Carousel } from "antd"
import styled from "styled-components"

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

interface SliderProps {
  photos?: string[]
}
const Slider = ({ photos }: SliderProps) => (
  <Carousel arrows autoplay style={{ minHeight: 300 }}>
    {photos?.map((url) => <Slide key={url} src={url} />)}
  </Carousel>
)

export default Slider
