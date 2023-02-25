import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import LinkBtn from "@/components/index/linkBtn";

const Wrapper = styled(motion.div)`
  margin: 0px auto;
  padding-top: 10vh;
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
  font-size: 50px;
  text-align: center;
`;
const Subtitle = styled(motion.div)`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  margin-left: 8px;
  color: #6f6f6f;
  text-align: center;
  transform: translateY(-10px);
`;
const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 12vh;
  height: fit-content;
`;
const Items = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
`;

export default function Home() {
  const items = [
    {
      title: "Binary Search Tree",
      destinationLink: "/board/binary-search-tree",
      imagePath: "/bst-mini.svg",
      description:
        "Tree structure with nodes having at most two children, where left subtree is smaller and right subtree is larger, for efficient data manipulation.",
      backgroundColor: "#5dade272",
      imageSize: {
        width: 95,
        height: 95,
      },
    },
    {
      title: "Sorting",
      destinationLink: "/board/sorting",
      imagePath: "/sorting-mini.svg",
      description:
        "Process of arranging a collection of items in a specific order. The goal is to arrange the items in ascending or descending order based on a specific criterion.",
      backgroundColor: "#48c9b072",
      imageSize: {
        width: 90,
        height: 90,
      },
    },
    {
      title: "Graph Traversal",
      destinationLink: "/board/graph-traversal",
      imagePath: "/graph-mini.svg",
      description:
        "Process of systematically visiting every vertex and edge in a graph using algorithms like DFS or BFS, to analyze and understand the relationships between them. ",
      backgroundColor: "#F1948Aaf",
      imageSize: {
        width: 94,
        height: 94,
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
        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          VisualizeMe
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          What would you want to visualize?
        </Subtitle>
      </Header>
      <Body
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <Items>
          {items.map((item) => {
            return <LinkBtn {...item} />;
          })}
        </Items>
      </Body>
    </Wrapper>
  );
}
