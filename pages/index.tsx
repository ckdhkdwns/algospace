import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import LinkBtn from "@/components/index/linkBtn";
import Image from "next/image";

const Wrapper = styled(motion.div)`
  margin: 0px auto;
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
`;
const Header = styled.div`
  margin: 0 auto 10vh;
`;

const Title = styled.div`
  display: flex;
  gap: 15px;
`
const Subtitle = styled(motion.div)`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  color: #7c7c7c;
  margin: 8px 0 0 70px;
`;
const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: fit-content;
`;
const Items = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 50px;
  color: #202020;
  font-weight: 500;
  line-height: 50px;
`;

export default function Home() {
  const items = [
    {
      title: "Binary Search Tree",
      destinationLink: "/board/binary-search-tree",
      imagePath: "/bst-mini.svg",
      backgroundColor: "#5dade272",
      imageSize: {
        width: 133,
        height: 133,
      },
    },
    {
      title: "Sorting",
      destinationLink: "/board/sorting",
      imagePath: "/sorting-mini.svg",
      backgroundColor: "#48c9b072",
      imageSize: {
        width: 110,
        height: 130,
      },
    },
    {
      title: "Graph Traversal",
      destinationLink: "/board/graph-traversal",
      imagePath: "/graph-mini.svg",
      backgroundColor: "#F1948Aaf",
      imageSize: {
        width: 136,
        height: 136,
      },
    },
  ];
  return (
    <Wrapper
      initial={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Title>
          <Image width="50" height="50" src="/logo.svg" alt="logo"/>
          <Name>AlgoSpace</Name>
          
        </Title>
        <Subtitle>Visualize algorithms & data structures</Subtitle>
      </Header>
      <Body>
        <Items>
          {items.map((item) => {
            return <LinkBtn {...item} />;
          })}
        </Items>
      </Body>
    </Wrapper>
  );
}
