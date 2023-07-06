import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Node, SortingValue } from "interfaces/types";
import ValueBar from "./elements/valueBar";
import { SORTING_GAP, SORTING_WIDTH } from "@/interfaces/constants";

const Board = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  
`;

const Svg = styled(motion.svg)`
  width: auto;
  height: 80%;
  margin: auto auto;
  transform: scaleY(-1);
`;

type SortingBoardProps = {
  sortingValues: SortingValue[];
  heightScale: number;
};
export default function SortingBoard({ sortingValues,heightScale }: SortingBoardProps) {
  const [maxValue, setMaxValue] = useState<number>(1);
  const boardRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(0);

  // 최대값을 기준으로 나머지 value bar 높이 맞추기 (%)
  useEffect(() => {
    const values = sortingValues.map((sortingValue) => sortingValue.value);
    setMaxValue(Math.max(...values));
    setSvgWidth(
      sortingValues.length * SORTING_WIDTH +
        (sortingValues.length - 1) * SORTING_GAP
    );
  }, [sortingValues]);

  return (
    <Board>
      <Svg
        transition={{ duration: 0.2 }}
        initial={{ width: svgWidth }}
        animate={{ width: svgWidth }}
        ref={boardRef}
      >
        {sortingValues.map((sortingValue, index) => {
          return (
            <ValueBar
              sortingValue={sortingValue}
              height = {((sortingValue.value * 90) / maxValue) * heightScale + "%"}
            ></ValueBar>
          );
        })}
      </Svg>
    </Board>
  );
}
