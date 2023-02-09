import { Node } from "interfaces/types";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";

const Line = styled(motion.line)`
  stroke-width: 3px;
`;

type RightLineControl = {
    nodes: Node[];
    node: Node;
    idx: number;
    strokeColor: string;
    rightLineControl: AnimationControls;
}

export default function RightLine({ nodes, node, idx, strokeColor, rightLineControl }:RightLineControl) {
    if(!node.rightNode) return <></>;
    return <Line
      x1={node.left}
      y1={node.top}
      x2={nodes[node.rightNode].left}
      y2={nodes[node.rightNode].top}
      initial={{ stroke: strokeColor, pathLength: 0 }}
      animate={rightLineControl}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
}