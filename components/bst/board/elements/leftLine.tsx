import { Node } from "interfaces/types";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { BST_STROKE_COLOR } from "@/interfaces/constants";

const Line = styled(motion.line)`
  stroke-width: 3px;
`;

type LeftLineControl = {
    nodes: Node[];
    node: Node;
    idx: number;
    leftLineControl: AnimationControls;
}

export default function LeftLine({ nodes, node, idx, leftLineControl }:LeftLineControl) {
    if(!node.leftNode) return <></>;
    return <Line
      x1={node.position.left}
      y1={node.position.top}
      x2={nodes[node.leftNode].position.left}
      y2={nodes[node.leftNode].position.top}
      initial={{ stroke: BST_STROKE_COLOR, pathLength: 0 }}
      animate={leftLineControl}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
}