import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, RefObject, useEffect, useState } from "react";
import { Node } from "interfaces/types";
import LeftLine from "./elements/leftLine";
import RightLine from "./elements/rightLine";
import BSTNode from "./elements/node";
import useGaps from "@/utils/hooks/useGaps";
import { debounce } from "@mui/material";

const Board = styled.div`
  display: flex;
  width: 85%;
  height: 100%;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
`;
const Svg = styled(motion.svg)<{maxHeight:number}>`
  width: 100%;
  height: ${props => props.maxHeight + "px"};
`;

type BSTControls = {
  circle: AnimationControls,
  leftLine: AnimationControls,
  rightLine: AnimationControls,
  text: AnimationControls
}

type BSTBoardProps = {
  boardRef: RefObject<HTMLDivElement>;
  nodes: Node[];
  controls: BSTControls;
};

export default function BSTBoard({
  boardRef,
  nodes,
  controls,
}: BSTBoardProps) {
  const [maxHeight, setMaxHeight] = useState(0);
  const [ XGAP, YGAP ] = useGaps(boardRef);

  
  useEffect(() => {  // svg 높이 맞춤 
    let max = 0;
    nodes.map(node => {
      if(!node.removed && node.depth > max) max = node.depth;
    });
    setMaxHeight((max + 1) * YGAP);
  }, [nodes]);

  const strokeColor = "#FF5733";
  return (
    <Board ref={boardRef}>
      <Svg maxHeight={maxHeight}>
        {nodes.map((node, idx) => {
          if (node.removed) return null;
          return (
            <g>
              <LeftLine 
                nodes={nodes}
                node={node}
                idx={idx}
                strokeColor={strokeColor}
                leftLineControl={controls.leftLine}
              />
              <RightLine 
                nodes={nodes}
                node={node}
                idx={idx}
                strokeColor={strokeColor}
                rightLineControl={controls.rightLine}
              />
            </g>
          );
        })}
        {nodes.map((node, idx) => {
          if (node.removed) return null;
          return (
            <BSTNode 
              idx={idx}
              strokeColor={strokeColor}
              circleControl={controls.circle}
              textControl={controls.text}
              node={node}
            />
          );
        })}
      </Svg>
    </Board>
  );
}
