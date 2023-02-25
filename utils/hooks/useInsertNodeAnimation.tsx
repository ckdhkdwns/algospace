import { BST_STROKE_COLOR } from "@/interfaces/constants";
import { BSTControls, Node } from "@/interfaces/types";
import { AnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

type InsertNodeAnimationProps = {
  nodes: Node[];
  insertPath: number[];
  controls: BSTControls;
  isAnimationActive: boolean;
};

type AnimationValues = {
  delay: number;
  duration: number;
  strokeColor: string;
};

const getAnimationValues = (isAnimationActive: boolean) => {
  if (isAnimationActive)
    return { delay: 1, duration: 0.5, strokeColor: BST_STROKE_COLOR };
  else return { delay: 0, duration: 0, strokeColor: "#000000" };
};

const useInsertNodeAnimation = ({
  nodes,
  insertPath,
  controls,
  isAnimationActive,
}: InsertNodeAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const colorElementsToDefault = async ({
    delay,
    duration,
    strokeColor,
  }: AnimationValues) => {
    Object.values(controls).forEach((control, idx) => {
      if (idx == 3) return;
      control.start((idx) => ({
        stroke: "#000000",
        transition: { duration: duration, delay: delay },
      }));
    });
  };

  const animateLines = ({ delay, duration, strokeColor }: AnimationValues) => {
    controls.leftLine.start((idx: number) => ({
      stroke: insertPath.includes(nodes[idx].leftNode!)
        ? strokeColor
        : "#000000",
      pathLength: 1,
      transition: {
        pathLength: {
          duration: duration,
          delay: (nodes[idx].depth + 1) * delay,
        },
        stroke: { duration: duration, delay: (nodes[idx].depth + 1) * delay },
      },
    }));
    controls.rightLine.start((idx: number) => ({
      stroke: insertPath.includes(nodes[idx].rightNode!)
        ? strokeColor
        : "#000000",
      pathLength: 1,
      transition: {
        pathLength: {
          duration: duration,
          delay: (nodes[idx].depth + 1) * delay,
        },
        stroke: { duration: duration, delay: (nodes[idx].depth + 1) * delay },
      },
    }));
  };

  const animateTexts = ({ delay, duration, strokeColor }: AnimationValues) => {
    controls.text.start((idx) => ({
      opacity: 1,
      transition: {
        duration: duration,
        delay:
          nodes[idx].depth == 0
            ? nodes[idx].depth * delay
            : (nodes[idx].depth + duration) * delay,
      },
    }));
  };

  const animateCircles = async (
    goalDepth: number,
    { delay, duration, strokeColor }: AnimationValues
  ) => {
    const limitedDelay = (idx: number) =>
      goalDepth * delay > nodes[idx].depth * delay
        ? nodes[idx].depth * delay
        : goalDepth * delay;
    await controls.circle.start((idx: number) => ({
      stroke: insertPath.includes(idx) ? strokeColor : "#000000",
      opacity: [idx + 1 == nodes.length ? 0 : 1, 1],
      cx: [
        idx + 1 == nodes.length && nodes[nodes[idx].parentNode]?.position.left
          ? nodes[nodes[idx].parentNode].position.left
          : nodes[idx].position.left,
        nodes[idx].position.left,
      ],
      cy: [
        idx + 1 == nodes.length && nodes[nodes[idx].parentNode]?.position.top
          ? nodes[nodes[idx].parentNode].position.top
          : nodes[idx].position.top,
        nodes[idx].position.top,
      ],

      transition: {
        stroke: { duration: duration, delay: limitedDelay(idx) },
        cx: { duration: duration, delay: limitedDelay(idx) },
        cy: { duration: duration, delay: limitedDelay(idx) },
        opacity: {
          duration: duration / 5,
          delay: limitedDelay(idx),
        },
      },
    }));
  };

  const animateInsert = async (insertNode: Node) => {
    if (isAnimationActive) setIsAnimating(true);
    const animationValues = getAnimationValues(isAnimationActive);
    const goalDepth = insertNode.depth;

    animateLines(animationValues);
    animateTexts(animationValues);
    await animateCircles(goalDepth, animationValues);

    await colorElementsToDefault(animationValues);
    setIsAnimating(false);
  };

  return animateInsert;
};

export default useInsertNodeAnimation;
