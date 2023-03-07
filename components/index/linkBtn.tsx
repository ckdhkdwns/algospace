import Router from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled.div`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  width: 220px;
  min-width: 220px;
  justify-content: space-between;
  height: 220px;
  min-height: 220px;
  border-radius: 10px;
  padding-top: 25px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.white};
  gap: 20px;
  padding: 30px;
  & img {
    margin: 0px auto;
  }
  &:hover{
    outline: 2px solid #e4e4e4;
  }
  &:hover + div{
    color: #2f2f2f;
  }
  & svg {
  }
`;

const BtnTitle = styled.div`
  font-size: 16px;
  color: #7c7c7c;
  text-align: center;
  font-weight: 300;
  transition: 0.2s all;
`;

const TitleWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  height: 100%;
`;

const ImageWrapper = styled.div<{ background: string }>`
  /* background: ${(props) => props.background}; */
  display: flex;
  margin: 10px auto 30px;
  & img {
    margin: auto auto;
  }
  & svg {
    width: 55px;
    height: 55px;
    margin: auto auto;
    & path,
    ellipse {
      stroke-width: 15px;
      stroke: ${(props) => props.theme.colors.blue};
    }
  }
`;
type LinkBtnProps = {
  title: string;
  destinationLink: string;
  imagePath: string;
  description: string;
  backgroundColor: string;
  imageSize: {
    width: number;
    height: number;
  };
};

export default function LinkBtn({
  title,
  destinationLink,
  imagePath,
  description,
  backgroundColor,
  imageSize,
}: LinkBtnProps) {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          Router.push(destinationLink);
        }}
      >
        <ImageWrapper background={backgroundColor}>
          <Image
            src={imagePath}
            alt={title}
            width={imageSize.width}
            height={imageSize.height}
          />
        </ImageWrapper>
      </Button>
      <BtnTitle>{title}</BtnTitle>
      {/* <Arrow>
        <MdOutlineArrowForward />
      </Arrow> */}
    </Wrapper>
  );
}
