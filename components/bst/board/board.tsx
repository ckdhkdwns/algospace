import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, useEffect, useState } from "react";
import { Node } from "interfaces/types";
import LeftLine from "./elements/leftLine";
import RightLine from "./elements/rightLine";
import BSTNode from "./elements/node";

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

type BSTBoardProps = {
  boardRef: Ref<HTMLDivElement>;
  nodes: Node[];
  circleControl: AnimationControls;
  textControl: AnimationControls;
  rightLineControl: AnimationControls;
  leftLineControl: AnimationControls;
  YGAP: number;
};

export default function BSTBoard({
  boardRef,
  nodes,
  circleControl,
  textControl,
  leftLineControl,
  rightLineControl,
  YGAP,
}: BSTBoardProps) {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {  // svg 높이 맞춤 
    let max = 0;
    nodes.map(node => {
      if(!node.removed && node.depth > max) max = node.depth;
    });
    setMaxHeight((max + 1) * YGAP);
  }, [nodes]);

  useEffect(() => {
    console.log(maxHeight);
  }, [maxHeight]);

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
                leftLineControl={leftLineControl}
              />
              <RightLine 
                nodes={nodes}
                node={node}
                idx={idx}
                strokeColor={strokeColor}
                rightLineControl={rightLineControl}
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
              circleControl={circleControl}
              textControl={textControl}
              node={node}
            />
          );
        })}
      </Svg>
    </Board>
  );
}
