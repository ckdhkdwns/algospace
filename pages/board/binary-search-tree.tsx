import { useEffect, useState, useRef, RefObject, Ref } from "react";
import styled from "styled-components";
import { AnimationControls, motion, useAnimationControls } from "framer-motion";
import BSTController from "@/components/bst/controller/controller";
import BSTBoard from "@/components/bst/board/board";

import ExportModal from "@/components/bst/exportModal/exportModal";
import useBSTGaps from "@/utils/bst/useBSTGaps";
import useBST from "@/utils/bst/useBST";
import useInput from "@/utils/hooks/useInput";
import useInsertNodeAnimation from "@/utils/bst/useInsertNodeAnimation";
import BSTHeader from "@/components/bst/header/header";

const Wrapper = styled(motion.div)`
  width: 100%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  flex-direction: column;
  width: 100%;
  height: 100vh;
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
    insertPath,
  } = useBST(boardRef);

  const [XGAP, YGAP] = useBSTGaps(boardRef);

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
      <BSTHeader />

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

      <ExportModal
        boardRef={boardRef}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Wrapper>
  );
}
