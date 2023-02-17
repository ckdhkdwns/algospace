import { AnimationControls, motion } from "framer-motion";
import { Node } from "interfaces/types";
import styled from "styled-components";

const Circle = styled(motion.circle)`
  fill: #ffffff;
  stroke-width: 3px;
`;
const Text = styled(motion.text)`
  font-size: 22px;
  font-weight: 700;
  alignment-baseline: middle;
  text-anchor: middle;
  transition: 0.2s all;
  font-family: "Lato";
`;

type BSTNodeProps = {
    idx: number;
    strokeColor: string;
    circleControl: AnimationControls;
    textControl: AnimationControls;
    node: Node;
}
export default function BSTNode({ idx, strokeColor, circleControl, textControl, node } : BSTNodeProps) {
    return (<g>
        <Circle
          custom={idx}
          initial={{ stroke: strokeColor }}
          animate={circleControl}
          transition={{
            duration: 0.5,
            stroke: { delay: 1, duration: 0.5 },
          }}
          r="21"
        />
        <Text
          initial={{ opacity: 0 }}
          custom={idx}
          animate={textControl}
          transition={{ delay: 0.3, duration: 0.5 }}
          id={"text" + idx}
          x={node.position.left}
          y={node.position.top + 2}
        >
          {node.value}
        </Text>
      </g>
      )
}