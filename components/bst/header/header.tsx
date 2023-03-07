import styled from "styled-components";
import Image from "next/image";
import { MdArrowBackIosNew } from "react-icons/md"
import Router from "next/router";

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 25px;
  gap: 10px;
  color: ${(props) => props.theme.colors.black};

  img {
    margin: 10px auto;
  }
`;

const ImageWrapper = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 10px;
  margin: auto 0;
  img {
    margin: auto auto;
  }
`;

const Title = styled.div`
  line-height: 60px;
  font-size: 30px;
`;

const BackButton = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  margin: auto auto;
  display: flex;
  border-radius: 10px;
  transition: 0.2s all;
  svg {
    margin: auto auto;
  }
  &:hover {
    background: ${(props) => props.theme.colors.gray200};
  }
`;

export default function BSTHeader() {
  return (
    <Wrapper>
      <BackButton onClick={() => Router.push("/")}>
        <MdArrowBackIosNew />
      </BackButton>
      <ImageWrapper>
        <Image src="/bst-mini.svg" alt="bst" width="35" height="35" />
      </ImageWrapper>

      <Title>Binary Search Tree</Title>
    </Wrapper>
  );
}
