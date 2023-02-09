import { Node } from "interfaces/types";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";

const Line = styled(motion.line)`
  stroke-width: 3px;
`;

type LeftLineControl = {
    nodes: Node[];
    node: Node;
    idx: number;
    strokeColor: string;
    leftLineControl: AnimationControls;
}

export default function LeftLine({ nodes, node, idx, strokeColor, leftLineControl }:LeftLineControl) {
    if(!node.leftNode) return <></>;
    return <Line
      x1={node.left}
      y1={node.top}
      x2={nodes[node.leftNode].left}
      y2={nodes[node.leftNode].top}
      initial={{ stroke: strokeColor, pathLength: 0 }}
      animate={leftLineControl}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
}