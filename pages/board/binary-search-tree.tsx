import { useEffect, useState, useRef, RefObject, Ref } from "react";
import styled from "styled-components";
import { useAnimationControls } from "framer-motion";
import { Node, Position } from "interfaces/types";
import { NonEmptyArray } from "interfaces/interfaces";
import BSTController from "@/components/bst/controller";
import BSTBoard from "@/components/bst/board/board";

import ExportModal from "@/components/bst/exportModal/exportModal";
import useGaps from "@/utils/hooks/useGaps";
import { debounce } from "@mui/material";
import useAnimationValues from "@/utils/hooks/useAnimationValues";
import { MdArrowBack } from "react-icons/md";
import useBST from "@/utils/hooks/useBST";
import useInput from "@/utils/hooks/useInput";

const Wrapper = styled.div`
  width: 100%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  width: 90%;
  height: 90vh;
  margin: auto auto;
  box-sizing: border-box;
`;

export default function BinarySearchTree() {
  const boardRef = useRef<HTMLDivElement>(null);

  const { 
    nodes, 
    insertNode, 
    removeNode,
    resetNodes, 
    replaceNodes, 
    insertPath 
  } =
    useBST(boardRef);
  const [windowSize, setWindowSize] = useState({});
  const [XGAP, YGAP] = useGaps(boardRef, windowSize);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [delay, duration, strokeColor] = useAnimationValues(isAnimationActive);
  const onInsertInputPress = useInput(insertNode);
  const onRemoveInputPress = useInput(removeNode);
  
  const controls = {
    circle: useAnimationControls(),
    leftLine: useAnimationControls(),
    rightLine: useAnimationControls(),
    text: useAnimationControls()
  }

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 500);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (nodes.length !== 0) replaceNodes(nodes);
  }, [XGAP, YGAP]);

  useEffect(() => {
    if (nodes.length == 0) return;
    animateInsert(nodes[nodes.length - 1]);
    if (isAnimationActive) setIsAnimating(true);
  }, [nodes]);

  const colorElementsToDefault = async (
    duration: number,
    delay: number,
  ) => {
    Object.values(controls).forEach((control, idx) => {
      if(idx == 3) return;
      control.start(idx => ({
        stroke: "#000000",
        transition: { duration: duration, delay: delay },  
      }))
    })
  };

  const animateLines = () => {
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

  const animateTexts = () => {
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

  const animateCircles = async (goalDepth: number) => {
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
    const goalDepth = insertNode.depth;

    animateLines();
    animateTexts();
    await animateCircles(goalDepth);

    await colorElementsToDefault(duration, delay);
    setIsAnimating(false);
  };

  return (
    <Wrapper>
      <Main>
        <BSTBoard
          boardRef={boardRef}
          nodes={nodes}
          controls={controls}
          YGAP={YGAP}
        />
        <BSTController
          onInsertInputPress={(e: any) => onInsertInputPress(e)}
          onRemoveInputPress={(e: any) => onRemoveInputPress(e)}
          reset={() => resetNodes()}
          isAnimationActive={isAnimationActive}
          setIsAnimationActive={(b: any) => setIsAnimationActive(b)}
          isAnimating={isAnimating}
          setIsModalOpen={setIsModalOpen}
        />
      </Main>
      <ExportModal
        boardRef={boardRef}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Wrapper>
  );
}
