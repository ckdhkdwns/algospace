import SortingBoard from "@/components/sorting/board/board";
import SortingController from "@/components/sorting/controller/controller";
import { SORTING_GAP, SORTING_WIDTH } from "@/interfaces/constants";
import { SortingValue } from "@/interfaces/types";
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
  const [sortingValues, setSortingValues] = useState<SortingValue[]>([]);

  const reset = () => {
    setSortingValues([]);
  };

  const selectionSorting = () => {
    for (let i = 0; i < sortingValues.length; i++) {
      setTimeout(() => {
        let minValue = Infinity;
        let minValueIndex = 0;
        sortingValues.map((sortingValue, index) => {
          if (!sortingValue.sorted && sortingValue.value < minValue) {
            minValue = sortingValue.value;
            minValueIndex = index;
          }
        });
        const copiedSortingValues = [...sortingValues];

        copiedSortingValues[minValueIndex].highlighted = true;
        setSortingValues((values) => (values = [...copiedSortingValues]));

        setTimeout(() => {
          copiedSortingValues.map((value) => {
            if (value.order == i)
              value.order = copiedSortingValues[minValueIndex].order;
          });
          copiedSortingValues[minValueIndex].order = i;
          copiedSortingValues[minValueIndex].sorted = true;
          setSortingValues((values) => (values = [...copiedSortingValues]));
        }, 1000);
      }, i * 2000); //어캐했노
    }
  };

  useEffect(() => {}, [sortingValues]);
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Main>
        <SortingBoard sortingValues={sortingValues}></SortingBoard>
        <SortingController
          addValue={(n: number) =>
            setSortingValues([
              ...sortingValues,
              {
                value: n,
                order: sortingValues.length,
                sorted: false,
                highlighted: false,
              },
            ])
          }
          reset={reset}
          testSorting={selectionSorting}
        ></SortingController>
      </Main>
    </Wrapper>
  );
}
