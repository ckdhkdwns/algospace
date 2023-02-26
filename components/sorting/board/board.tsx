import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Node } from "interfaces/types";
import ValueBar from "./elements/valueBar";

const Board = styled.div`
  display: flex;
  width: 85%;
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
  values: number[]
}
export default function SortingBoard({ values }: SortingBoardProps) {
  const [maxValue, setMaxValue] = useState<number>(1);
  const boardRef = useRef(null);

  const gap = 10;
  const width = 50;
  const [svgWidth, setSvgWidth] = useState(0);

  useEffect(() => {
    setMaxValue(Math.max(...values));
    setSvgWidth(values.length * width + (values.length - 1) * gap);
  }, [values]);

  return (
    <Board>
      <Svg transition={{ duration:0.2 }} initial={{ width: svgWidth }} animate={{ width: svgWidth }} ref={boardRef}>
        {values.map((value, index) => {
          return <ValueBar 
            x={index * (width + gap)} 
            height={value * 100 / maxValue}
            width={width} 
            value={value}></ValueBar>
        })}
      </Svg>

    </Board>
  );
}
