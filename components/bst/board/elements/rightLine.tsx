import { Node } from "interfaces/types";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { BST_STROKE_COLOR } from "@/interfaces/constants";

const Line = styled(motion.line)`
  stroke-width: 3px;
`;

type RightLineControl = {
    nodes: Node[];
    node: Node;
    idx: number;
    rightLineControl: AnimationControls;
}

export default function RightLine({ nodes, node, idx, rightLineControl }:RightLineControl) {
    if(!node.rightNode) return <></>;
    return <Line
      x1={node.position.left}
      y1={node.position.top}
      x2={nodes[node.rightNode].position.left}
      y2={nodes[node.rightNode].position.top}
      initial={{ stroke: BST_STROKE_COLOR, pathLength: 0 }}
      animate={{
        x1: node.position.left,
        y1: node.position.top,
        x2: nodes[node.rightNode].position.left,
        y2: nodes[node.rightNode].position.top,
        pathLength: 1,
        stroke: '#000000',
      }}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
}