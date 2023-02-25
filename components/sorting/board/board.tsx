import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, RefObject, useEffect, useState } from "react";
import { Node } from "interfaces/types";
import useGaps from "@/utils/hooks/useGaps";

const Board = styled.div`
  display: flex;
  width: 85%;
  height: 100%;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
`;

type SortingBoardProps = {
  values: number[]
}
export default function SortingBoard({values}:SortingBoardProps) {
  return (
    <Board>
      {...values}
    </Board>
  );
}
