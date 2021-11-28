import {Container, Wrapper, LeftArrow, RightArrow, Slide, ImgContainer, Image, InfoContainer, Title, Desc, Button} from './Slider.styles'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { sliderItems } from "../data";
import { useState } from "react";



const Slider = () => {
    
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction: string) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }
    };
  
    return (
      <Container>
        <LeftArrow onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </LeftArrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <RightArrow onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </RightArrow>
      </Container>
    );
  };
  
  export default Slider;