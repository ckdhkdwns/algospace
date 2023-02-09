import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref } from "react";
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
const Svg = styled(motion.svg)`
  width: 100%;
  height: 100%;
`;

type BSTBoardProps = {
  boardRef: Ref<HTMLDivElement>;
  nodes: Node[];
  circleControl: AnimationControls;
  textControl: AnimationControls;
  rightLineControl: AnimationControls;
  leftLineControl: AnimationControls;
  svgRef: Ref<SVGElement>;
};

export default function BSTBoard({
  boardRef,
  nodes,
  circleControl,
  textControl,
  leftLineControl,
  rightLineControl,
  svgRef
}: BSTBoardProps) {
  const strokeColor = "#FF5733";
  return (
    <Board id="board" ref={boardRef}>
      <Svg>
        {nodes.map((node, idx) => {
          if (!node.active) return null;
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
          if (!node.active) return null;
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
