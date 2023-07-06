import SortingBoard from "@/components/sorting/board/board";
import SortingController from "@/components/sorting/controller/controller";
import SortingHeader from "@/components/sorting/header/header";
import useSorting from "@/hooks/sorting/useSorting";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  flex-direction: column;
  background-color: #fdfdfd;
  background-image: linear-gradient(
      90deg,
      #efefef 0px,
      #efefef 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      #efefef,
      0px,
      #efefef 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      #efefef 0px,
      #efefef 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      90deg,
      #efefef 0px,
      #efefef 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    );
  background-size: 20px 100%, 100% 20px, 100% 20px, 20px 100%;
`;

export default function Sorting() {
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const {
    sortingValues,
    addValue,
    reset,
    skipBack,
    selectionSort,
    insertionSort,
    bubbleSort,
    quickSort,
    heightScale,
  } = useSorting(animationSpeed);

  return (
    <Wrapper
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // transition={{ duration: 0.3 }}
    >
      <SortingHeader />
      <SortingBoard
        sortingValues={sortingValues}
        heightScale={heightScale}
      ></SortingBoard>
      <SortingController
        addValue={addValue}
        skipBack={skipBack}
        reset={reset}
        selectionSort={selectionSort}
        insertionSort={insertionSort}
        bubbleSort={bubbleSort}
        quickSort={quickSort}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      ></SortingController>
    </Wrapper>
  );
}
