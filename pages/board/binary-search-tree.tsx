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
  const [rootNode, setRootNode] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [insertNodePath, setInsertNodePath] = useState([rootNode]);
  
  const [windowSize, setWindowSize] = useState({})
  const [XGAP, YGAP] = useGaps(boardRef, windowSize);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [delay, duration, strokeColor] = useAnimationValues(isAnimationActive)

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });    
    }, 500);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);

  useEffect(() => {
    if(nodes.length !== 0) replaceNodes(nodes);
  }, [XGAP, YGAP])

  useEffect(() => {
    if (nodes.length == 0) return;
    animateInsert(nodes[nodes.length - 1]);
    if (isAnimationActive) setIsAnimating(true);
  }, [nodes]);
 
  type appendChildProps = {
    parentNode: number,
    value: number,
    position: Position
  }

  const appendChild = ({
    parentNode,
    value,
    position
  }:appendChildProps) => {
    setNodes([
      ...nodes,
      {
        value: value,

        parentNode: parentNode,
        leftNode: null,
        rightNode: null,

        depth: parentNode == -1 ? 0 : nodes[parentNode].depth + 1,
        position: {
          top: position.top,
          left: position.left,
        },
        removed: false,
      },
    ]);
  }

  const getNodePosition = (directions: string[]) => {
    const depth = directions.length;
    const boardWidth:number | null = boardRef?.current && boardRef.current.getBoundingClientRect().width;

    if(boardWidth == null) throw new Error;
    let top = YGAP / 2;
    let left = boardWidth! / 2;
    if(depth == 0) return {
      top: top,
      left: left
    };
    for(let i=0;i<depth;i++) {
      top += YGAP;
      if(directions[i] == "L") left -= boardWidth * 0.95 / (2 ** (i + 2));
      else left += boardWidth * 0.95 / (2 ** (i + 2));
    }
    return {
      top: top,
      left: left
    };
  }

  const insertNode = (insertValue: number) => {
    if (nodes.length == rootNode) {
      // 삽입하려는 노드가 첫번째 노드 (root node)라면
      appendChild({
        parentNode: -1,
        value: insertValue,
        position: getNodePosition([])
      })
      return;
    }
    const recursion = (currentNode:number, directions:string[], path:number[]) => {
      if (insertValue < nodes[currentNode].value) {
        const leftChildNode = nodes[currentNode].leftNode;
        if (leftChildNode) {
          recursion(
            leftChildNode,
            [...directions, "L"],
            [...path, leftChildNode]
          );
        } else {
          nodes[currentNode].leftNode = nodes.length;
          appendChild({
            parentNode: currentNode,
            value: insertValue,
            position: getNodePosition([...directions, "L"])
          })
          path.push(nodes.length);
          setInsertNodePath(path);
        }
      } else {
        const rightChildNode = nodes[currentNode].rightNode;
        if (rightChildNode) {
          recursion(
            rightChildNode,
            [...directions, "R"],
            [...path, rightChildNode]
          );
        } else {
          nodes[currentNode].rightNode = nodes.length;
          appendChild({
            parentNode: currentNode,
            value: insertValue,
            position: getNodePosition([...directions, "R"])
          })
          path.push(nodes.length);
          setInsertNodePath(path);
        }
      }
    }
    recursion(rootNode, [], [rootNode]);
  };

  const replaceNodes = (nodes: Node[]) => {
    const copiedNodes = [...nodes];    
    const recursion = (
      index: number | null,
      directions: string[]
    ) => {
      
      if (index == null) return;
      if (index == rootNode) copiedNodes[rootNode].position = getNodePosition([]);
      else {
        copiedNodes[index].position = getNodePosition(directions);
        copiedNodes[index].depth = directions.length;
      }
      recursion(
        copiedNodes[index].leftNode,
        [...directions, "L"]
      )
      recursion(
        copiedNodes[index].rightNode,
        [...directions, "R"]
      )
    };
    if(nodes.length !== 0) recursion(rootNode, []);
    setNodes([...copiedNodes]);
  };

  function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
    return arr.length > 0;
  }

  const getRemoveIndex = (value: number, index: number) => {
    let result = -1;
    const recursion = (value: number, index: number) => {
      if (nodes[index].value == value) result = index;

      const leftNode = nodes[index].leftNode;
      const rightNode = nodes[index].rightNode;
      if (leftNode) recursion(value, leftNode);
      if (rightNode) recursion(value, rightNode);
    };
    recursion(value, index);
    return result;
  };

  const getSuccessorIndex = (value: number) => {
    let currentNode: any = rootNode;
    let stack: number[] = [];
    let result: number[] = [];

    /** 중위순회를 하다가 value랑 일치하면 그 노드의 인덱스를 valueIndex에 저장한다.
     *  순회가 끝나면 저장해둔 인덱스 + 1을 return
     */
    let valueIndex: number = 0;

    while (true) {
      if (currentNode != null) {
        if (value == nodes[currentNode].value) valueIndex = currentNode;
        stack.push(currentNode);
        currentNode = nodes[currentNode].leftNode;
      } else if (isNonEmpty(stack)) {
        currentNode = stack.pop();
        result.push(currentNode);
        currentNode = nodes[currentNode].rightNode;
      } else {
        break;
      }
    }
    // 후임 노드가 없다면 -1을 리턴
    let successorIndex = -1;
    result.map((node, idx) => {
      if (node == valueIndex) successorIndex = result[idx + 1];
    });

    return successorIndex;
  };

  const removeNode = (removeValue: number) => {
    const copiedNodes = [...nodes];
    const removeIndex: number = getRemoveIndex(removeValue, rootNode);
    const removeNode: Node = copiedNodes[removeIndex];
    const successorIndex: number = getSuccessorIndex(removeValue);

    if (removeIndex == -1) return;
    removeNode.removed = true;

    const parentIndex: number = copiedNodes[removeIndex].parentNode!;
    const isLeftNode = copiedNodes[removeIndex].value < copiedNodes[parentIndex].value;
    // case 1 : node to be removed have tho children
    if (
      copiedNodes[removeIndex].leftNode !== null &&
      copiedNodes[removeIndex].rightNode !== null
    ) {
      if (isLeftNode) copiedNodes[parentIndex].leftNode = successorIndex;
      else copiedNodes[parentIndex].rightNode = successorIndex;
      copiedNodes[successorIndex].parentNode = removeNode.parentNode;

      // 지우고자 하는 노드의 자식노드 중에 지울 노드의 후임 노드가 있을 경우 고려
      if (copiedNodes[removeIndex].leftNode !== successorIndex)
        copiedNodes[successorIndex].leftNode =
          copiedNodes[removeIndex].leftNode;
      if (copiedNodes[removeIndex].rightNode !== successorIndex)
        copiedNodes[successorIndex].rightNode =
          copiedNodes[removeIndex].rightNode;

      copiedNodes[successorIndex].position = copiedNodes[removeIndex].position;     
    }
    // case 2 : node to be removed has only left child
    else if (copiedNodes[removeIndex].leftNode !== null) { 
      if (isLeftNode) copiedNodes[parentIndex].leftNode = removeNode.leftNode;
      else copiedNodes[parentIndex].rightNode = copiedNodes[removeIndex].leftNode;
      copiedNodes[removeNode.leftNode!].parentNode = removeNode.parentNode;
    }
    // case 3 : node to be removed has only right child
    else if (copiedNodes[removeIndex].rightNode !== null) {
      if (isLeftNode) copiedNodes[parentIndex].leftNode = copiedNodes[removeIndex].rightNode;
      else copiedNodes[parentIndex].rightNode = copiedNodes[removeIndex].rightNode;
      copiedNodes[removeNode.rightNode!].parentNode = removeNode.parentNode;
    }
    // case 4: node to be removed doesn't have any children
    else {
      console.log("Case 4")
      if (isLeftNode) copiedNodes[parentIndex].leftNode = null;
      else copiedNodes[parentIndex].rightNode = null;
    }
    replaceNodes(copiedNodes);
  };

  const onInsertInputPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        insertNode(e.target.value *= 1);
        e.target.value = "";
      }
    }
  };

  const onRemoveInputPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        removeNode(e.target.value);
        e.target.value = "";
      }
    }
  };

  const reset = () => {
    setNodes([]);
    setInsertNodePath([0]);
  };

  const circleControl = useAnimationControls();
  const leftLineControl = useAnimationControls();
  const rightLineControl = useAnimationControls();
  const textControl = useAnimationControls();

  const colorElementsToDefault = async (
    duration: number,
    delay: number,
    goalDepth: number
  ) => {
    leftLineControl.start((idx) => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay },
    }));
    rightLineControl.start((idx) => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay },
    }));
    await circleControl.start((idx) => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay },
    }));
  };

  const animateLines = () => {
    leftLineControl.start((idx: number) => ({
      stroke: insertNodePath.includes(nodes[idx].leftNode!)
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
    rightLineControl.start((idx: number) => ({
      stroke: insertNodePath.includes(nodes[idx].rightNode!)
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
    textControl.start((idx) => ({
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
    await circleControl.start((idx: number) => ({
      stroke: insertNodePath.includes(idx) ? strokeColor : "#000000",
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

    await colorElementsToDefault(duration, delay, goalDepth);
    setIsAnimating(false);
    setInsertNodePath([rootNode]);
  };

  return (
    <Wrapper>
      <Main>
        <BSTBoard
          boardRef={boardRef}
          nodes={nodes}
          leftLineControl={leftLineControl}
          rightLineControl={rightLineControl}
          circleControl={circleControl}
          textControl={textControl}
          YGAP={YGAP}
        />
        <BSTController
          onInsertInputPress={(e: any) => onInsertInputPress(e)}
          onRemoveInputPress={(e: any) => onRemoveInputPress(e)}
          reset={() => reset()}
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
