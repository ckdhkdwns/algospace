import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
    width: fit-content;
    display: flex;
    padding: 20px;
`

const ImageWrapper = styled.div`
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background: #5dade272;
  display: flex;
  & img {
    margin: auto auto;
  }
  & svg{
    width: 55px;
    height: 55px;
    margin: auto auto;
  }
`
const Title = styled.div`
  line-height: 52px;
  font-size: 30px;
  font-weight: 500;
  margin-left: 10px;

`;

export default function BSTTitle() {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src="/bst-mini.svg" alt="bst" width="40" height="40" />
      </ImageWrapper>
      
      <Title>Binary Search Tree</Title>
    </Wrapper>
  );
}
