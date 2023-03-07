import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import LinkBtn from "@/components/index/linkBtn";

const Wrapper = styled(motion.div)`
  margin: 0px auto;
  padding-top: 30vh;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
`;
const Header = styled.div``;
const Subtitle = styled(motion.div)`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  color: #7c7c7c;
  text-align: center;
  transform: translateY(-10px);
`;
const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
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
        width: 133,
        height: 133,
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
        width: 110,
        height: 130,
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
        <Subtitle
          
        >
          Select structure to visualize
        </Subtitle>
      </Header>
      <Body
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
