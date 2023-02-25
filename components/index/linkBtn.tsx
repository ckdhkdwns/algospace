import Router from "next/router";
import styled from "styled-components";
import Image from "next/image"
import { MdOutlineArrowForward } from "react-icons/md"
const Wrapper = styled.button<{ background: string }>`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  width: 350px;
  min-width: 350px;
  justify-content: space-between;
  height: 400px;
  border-radius: 10px;
  padding-top: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  box-sizing: border-box;
  transition: 0.2s all;
  background-color: ${props => props.theme.colors.white};
  gap: 20px;
  padding: 30px;
  & img {
    margin: 0px auto;
  }
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.3) 0px 58px 84px;
  }
  & svg {
    
  }
`;

const Arrow = styled.div`
  & svg {
    position: absolute;
    width :40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
    fill: cadetblue;
  }
  
`
const BtnTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const BtnSubtitle = styled.div`
  margin-top: 5px;
  text-align: left;
  font-size: 14px;
  color: ${props => props.theme.colors.gray400};
`;

const TitleWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  height: 100%;
`;

const ImageWrapper = styled.div<{ background: string }>`
  border-radius: 10px;
  width: 120px;
  height: 120px;
  min-height: 70px;
  /* background: ${props => props.background}; */
  display: flex;
  margin: 10px auto 30px;
  & img {
    margin: auto auto;
  }
  & svg{
    width: 55px;
    height: 55px;
    margin: auto auto;
    & path, ellipse{
      stroke-width: 15px;
      stroke: ${props => props.theme.colors.blue};
    }
    
  }
`
type LinkBtnProps = {
    title: string;
    destinationLink: string,
    imagePath: string;
    description: string;
    backgroundColor: string;
    imageSize: {
      width: number,
      height: number
    }
  };

  
export default function LinkBtn({
  title,
  destinationLink,
  imagePath,
  description,
  backgroundColor,
  imageSize
}: LinkBtnProps) {
  
  return (
    <Wrapper
      onClick={() => {
        Router.push(destinationLink);
      }}
      background={backgroundColor}
    > 
      <ImageWrapper background={backgroundColor}>
        <Image src={imagePath} alt={title} width={imageSize.width} height={imageSize.height}/>
      </ImageWrapper>
      
      <TitleWrapper>
        <BtnTitle>{title}</BtnTitle>
        <BtnSubtitle>{description}</BtnSubtitle>
      </TitleWrapper>
      <Arrow>
        <MdOutlineArrowForward />
      </Arrow>
      
    </Wrapper>
  );
}
