import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import Router from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const Wrapper = styled.div`
  margin: 0px auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
`;
const Header = styled.div``;
const Title = styled(motion.div)`
  width: 100%;
  font-weight: 700;
  font-size: 70px;
`;
const Subtitle = styled(motion.div)`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  margin-left: 8px;
  color: #6f6f6f;
  transform: translateY(-10px);
`;
const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 15vh;
  height: fit-content;
`;
const BodyTitle = styled.div`
  font-size: 18px;
  margin: 0 0 20px 10px;
  color: #6f6f6f;
`;
const Items = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;
const Btn = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 300px;
  min-width: 300px;
  justify-content: space-between;
  height: 320px;
  border-radius: 10px;
  padding-top: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  box-sizing: border-box;
  transition: 0.2s all;
  & img {
    margin: 0px auto;
  }
  &:hover {
    transform: scale(0.95);
  }
`;
const BSTBtn = styled(Btn)`
  background: #5dade272;
`;
const SortingBtn = styled(Btn)`
  background: #48c9b072;
  &:hover {
  }
`;

const BtnTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const BtnSubtitle = styled.div`
  margin-top: 5px;
  text-align: left;
  font-size: 13px;
  color: #282828;
`;

const TitleWrapper = styled.div`
  background: #ffffff;
  padding: 15px 15px 20px 20px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
`;

export default function Home() {
  return (
    <Wrapper>
      <Header>
        <Title
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1 }}
        >
          DSAV
        </Title>
        <Subtitle
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Visualize various data structures and algorithms.
        </Subtitle>
      </Header>
      <Body
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
      >
        {/* <BodyTitle>Visualizers</BodyTitle> */}
        <Items>
          <BSTBtn
            onClick={() => {
              Router.push("/board/binary-search-tree");
            }}
          >
            <Image src="/bst.svg" alt="bst" width="170" height="170" />
            <TitleWrapper>
              <BtnTitle>Binary Search Tree</BtnTitle>
              <BtnSubtitle>Insert and Delete nodes in BST</BtnSubtitle>
            </TitleWrapper>
          </BSTBtn>
          <SortingBtn
            onClick={() => {
              Router.push("/board/sorting");
            }}
          >
            <Image src="/sorting.svg" alt="bst" width="174" height="174" />
            <TitleWrapper>
              <BtnTitle>Sorting</BtnTitle>
              <BtnSubtitle>Sort various values</BtnSubtitle>
            </TitleWrapper>
          </SortingBtn>
          <SortingBtn
            onClick={() => {
              Router.push("/board/sorting");
            }}
          >
            <Image src="/sorting.svg" alt="bst" width="174" height="174" />
            <TitleWrapper>
              <BtnTitle>Sorting</BtnTitle>
              <BtnSubtitle>Sort various values</BtnSubtitle>
            </TitleWrapper>
          </SortingBtn>
          <SortingBtn
            onClick={() => {
              Router.push("/board/sorting");
            }}
          >
            <Image src="/sorting.svg" alt="bst" width="174" height="174" />
            <TitleWrapper>
              <BtnTitle>Sorting</BtnTitle>
              <BtnSubtitle>Sort various values</BtnSubtitle>
            </TitleWrapper>
          </SortingBtn>
        </Items>
      </Body>
    </Wrapper>
  );
}
