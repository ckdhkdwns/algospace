import SortingBoard from "@/components/sorting/board/board";
import SortingController from "@/components/sorting/controller/controller";
import { SORTING_GAP, SORTING_WIDTH } from "@/interfaces/constants";
import { SortingValue } from "@/interfaces/types";
import useSorting from "@/utils/sorting/useSorting";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 100%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: auto auto;
  box-sizing: border-box;
`;

export default function Sorting() {
  const {
    sortingValues,
    addValue,
    reset,
    skipBack,
    selectionSorting,
    insertionSorting,
    bubbleSorting,
    heightScale
  } = useSorting();
  
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Main>
        <SortingBoard 
          sortingValues={sortingValues}
          heightScale={heightScale}></SortingBoard>
        <SortingController
          addValue={addValue}
          skipBack={skipBack}
          reset={reset}
          selectionSorting={selectionSorting}
          insertionSorting={insertionSorting}
          bubbleSorting={bubbleSorting}
        ></SortingController>
      </Main>
    </Wrapper>
  );
}
