import { useEffect, useState, useRef, RefObject, Ref } from "react";
import styled from "styled-components";
import { AnimationControls, motion, useAnimationControls } from "framer-motion";
import { Node, Position } from "interfaces/types";
import { NonEmptyArray } from "interfaces/interfaces";
import BSTController from "@/components/bst/controller/controller";
import BSTBoard from "@/components/bst/board/board";

import ExportModal from "@/components/bst/exportModal/exportModal";
import useGaps from "@/utils/hooks/useGaps";
import { debounce } from "@mui/material";
import useAnimationValues from "@/utils/hooks/useAnimationValues";
import { MdArrowBack } from "react-icons/md";
import useBST from "@/utils/hooks/useBST";
import useInput from "@/utils/hooks/useInput";
import useInsertNodeAnimation from "@/utils/hooks/useInsertNodeAnimation";

const Wrapper = styled(motion.div)`
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
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 90%;
  height: 90vh;
  margin: auto auto;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.gray200};
`;

export default function BinarySearchTree() {
  const boardRef = useRef<HTMLDivElement>(null);

  const {
    nodes,
    insertNode,
    removeNode,
    resetNodes,
    replaceNodes,
    insertPath,
  } = useBST(boardRef);

  const [XGAP, YGAP] = useGaps(boardRef);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const controls = {
    circle: useAnimationControls(),
    leftLine: useAnimationControls(),
    rightLine: useAnimationControls(),
    text: useAnimationControls(),
  };
  const animateInsert = useInsertNodeAnimation({
    nodes: nodes,
    insertPath: insertPath,
    controls: controls,
    isAnimationActive: isAnimationActive,
  });

  const onInsertInputPress = useInput(insertNode);
  const onRemoveInputPress = useInput(removeNode);

  useEffect(() => {
    if (nodes.length !== 0) replaceNodes(nodes);
  }, [XGAP, YGAP]);

  useEffect(() => {
    if (nodes.length == 0) return;
    animateInsert(nodes[nodes.length - 1]);
    console.log(nodes);
  }, [nodes]);


  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Main>
        <BSTBoard boardRef={boardRef} nodes={nodes} controls={controls} />
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
