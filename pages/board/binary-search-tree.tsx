import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AnimationControls, motion, useAnimation, useAnimationControls } from "framer-motion"
import { Node, Position } from "interfaces/types";
import { NonEmptyArray } from "interfaces/interfaces";
import { getElementWidth, getElementHeight } from "@/utils/elements";
import BSTController from "@/components/bst/controller";
import BSTBoard from "@/components/bst/board/board";

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const Wrapper = styled.div`
  width: 90%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.white};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  
  border-radius: ${props => props.theme.borderRadius.medium};
  height: 90vh;
`;

export default function BinarySearchTree() {
  const boardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGElement>(null);
  const [rootNode, setRootNode] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const insertInput = useRef<HTMLInputElement>(null);
  const removeInput = useRef<HTMLInputElement>(null);
  const [insertNodePath, setInsertNodePath] = useState([rootNode]);
  const [isAnimationActive, setIsAnimationActive] = useState(true);

  const MAX_DEPTH = 6;
  const [ XGAP, setXGAP ] = useState(0);
  const [ YGAP, setYGAP ] = useState(0);
  
  const [delay, setDelay] = useState(1);
  const [duration, setDuration] = useState(0.5);
  const [strokeColor, setStrokeColor] = useState("#FF5733");

  const [isAnimating, setIsAnimating] = useState(false);

  const initGaps = () => {
    if(boardRef) {
      setXGAP(getElementWidth(boardRef)! / (2 ** (MAX_DEPTH + 2.1)));
      setYGAP(Math.floor(getElementHeight(boardRef)! /MAX_DEPTH));
    }
  }
  useEffect(() => {
    initGaps();
  },[boardRef]);

  
  

  const appendLeftChild = (parentNode:number, value: number, xPosition: number) => {
    setNodes([
      ...nodes,
      {
        value: value,

        parentNode: parentNode,
        leftNode: null,
        rightNode: null,

        depth: nodes[parentNode].depth + 1,
        top: nodes[parentNode].top + YGAP,
        left: nodes[parentNode].left - xPosition * XGAP,
        active: true,
      },
    ]);
  }

  const appendRightChild = (parentNode: number, value: number, xPosition: number) => {
    setNodes([
      ...nodes,
      {
        value: value,

        parentNode: parentNode,
        leftNode: null,
        rightNode: null,

        depth: nodes[parentNode].depth + 1,
        top: nodes[parentNode].top + YGAP,
        left: nodes[parentNode].left + xPosition * XGAP,
        active: true,
      },
    ]);
  }
  
  const appendRootNode = (value: number) => {
    setNodes([
      {
        value: value,
        
        parentNode: -1,
        leftNode: null,
        rightNode: null,

        depth: 0,
        top: YGAP / 2,
        left: getElementWidth(boardRef)! / 2,
        active: true,
      },
    ]);
  }

  const insertNode = (
    insertValue: number,
    index: number | null,
    depth: number,
    xPosition: number,
    path: number[]
  ) => {
    if (index === null) return;
    if (nodes.length == rootNode) { // 삽입하려는 노드가 첫번째 노드 (root node)라면
      appendRootNode(insertValue);
      return;
    }
    if (insertValue < nodes[index].value) {
      const node = nodes[index].leftNode;
      if (node) {
        path.push(node);
        insertNode(
          insertValue,
          node,
          depth + 1,
          xPosition - 2 **  (MAX_DEPTH - depth),path);
      } else {
        nodes[index].leftNode = nodes.length;
        appendLeftChild(index, insertValue, xPosition);
        path.push(nodes.length);
        setInsertNodePath(path);
      }
    } else {
      const node = nodes[index].rightNode;
      if (node) {
        path.push(node);
        insertNode(
          insertValue,
          node,
          depth + 1,
          xPosition - 2 **  (MAX_DEPTH - depth),
          path
        );
      } else {
        nodes[index].rightNode = nodes.length;
        appendRightChild(index, insertValue, xPosition);
        path.push(nodes.length);
        setInsertNodePath(path);
      }
    }    
    
  };

  const replaceNodes = (
    index: number | null,
    depth: number,
    xPosition: number
  ) => {
    const copiedNodes = [...nodes];
    const recursion = (
      index: number | null,
      depth: number,
      xPosition: number
    ) => {
      if(index == rootNode) {

      }
    }
    
  }
  function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
    return arr.length > 0;
  }
  
  const getRemoveIndex = (value:number, index:number) => {
    let result = -1;
    const recursion = (value:number, index:number) => {
      if(nodes[index].value == value) result = index;

      const leftNode = nodes[index].leftNode;
      const rightNode = nodes[index].rightNode;
      if(leftNode) recursion(value, leftNode);
      if(rightNode) recursion(value, rightNode); 
    }
    recursion(value, index);
    return result;
  }

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
    if (result[result.length - 1] == valueIndex)
      return [valueIndex, successorIndex];

    result.map((node, idx) => {
      if (node == valueIndex) successorIndex = result[idx + 1];
    });

    return [valueIndex, successorIndex];
  };

  const removeNodeInBST = (removeValue: number) => {
    const indexs: number[] = getSuccessorIndex(removeValue);
    const removeIndex: number = getRemoveIndex(removeValue, rootNode);
    const successorIndex: number = indexs[1];

    if(removeIndex == -1) return;
    nodes[removeIndex].active = false;

    const copiedNodes = [...nodes];
    const parentNode:number = copiedNodes[removeIndex].parentNode!;
    const isLeftNode = copiedNodes[removeIndex] < copiedNodes[parentNode];


    // case 1 : node to be removed have tho children
    if (
      nodes[removeIndex].leftNode !== null &&
      nodes[removeIndex].rightNode !== null
    ) {
      if(isLeftNode) copiedNodes[parentNode].leftNode = successorIndex;
      else copiedNodes[parentNode].rightNode = successorIndex;

      // 지우고자 하는 노드의 자식노드 중에 지울 노드의 후임 노드가 있을 경우 고려
      if (nodes[removeIndex].leftNode !== successorIndex)
        copiedNodes[successorIndex].leftNode = copiedNodes[removeIndex].leftNode;
      if (nodes[removeIndex].rightNode !== successorIndex)
        copiedNodes[successorIndex].rightNode = copiedNodes[removeIndex].rightNode;

        copiedNodes[successorIndex].top = copiedNodes[removeIndex].top;
        copiedNodes[successorIndex].left = copiedNodes[removeIndex].left;
    }
    // case 2 : node to be removed has only left child
    else if (nodes[removeIndex].leftNode !== null) {
      const leftIndex: number = nodes[removeIndex].leftNode!;

      copiedNodes[leftIndex].top = copiedNodes[removeIndex].top;
      copiedNodes[leftIndex].left = copiedNodes[removeIndex].left;
      console.log(nodes[removeIndex], nodes[leftIndex])
      if(isLeftNode) copiedNodes[parentNode].leftNode = copiedNodes[removeIndex].leftNode;
      else copiedNodes[parentNode].rightNode = copiedNodes[removeIndex].leftNode;  
    }
    // case 3 : node to be removed has only right child
    else if (nodes[removeIndex].rightNode !== null) {
      
      const rightIndex: number = nodes[removeIndex].rightNode!;

      copiedNodes[rightIndex].top = copiedNodes[removeIndex].top;
      copiedNodes[rightIndex].left = copiedNodes[removeIndex].left;
      
      if(isLeftNode) copiedNodes[parentNode].leftNode = copiedNodes[removeIndex].rightNode;
      else copiedNodes[parentNode].rightNode = copiedNodes[removeIndex].rightNode;  
    }

    // case 4: node to be removed doesn't have any children
    else {
      if(isLeftNode) copiedNodes[parentNode].leftNode = null;
      else copiedNodes[parentNode].rightNode = null;
    }
    setNodes(copiedNodes);
  };

  useEffect(() => {
    if (nodes.length == 0) return;
    animateInsert(nodes[nodes.length-1]);
    if(isAnimationActive) setIsAnimating(true);
  }, [nodes])

  useEffect(() => console.log(isAnimating), [isAnimating]);

  useEffect(() => {
    if(isAnimationActive) {
      setDelay(1);
      setDuration(0.5);
      setStrokeColor("#FF5733");
    } else {
      setDelay(0);
      setDuration(0);
      setStrokeColor("#000000");
    }
  }, [isAnimationActive])

  
  const onInsertInputPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        insertNode(e.target.value*=1, rootNode, 1, 2 ** MAX_DEPTH, [rootNode]);
        e.target.value = "";
      }
    }
  };

  const onRemoveInputPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        removeNodeInBST(e.target.value);
        e.target.value = "";
      }
    }
  };

  const reset = () => {
    setNodes([]);
    setInsertNodePath([0]);
    initGaps();
  };

  const circleControl = useAnimationControls();
  const leftLineControl = useAnimationControls();
  const rightLineControl = useAnimationControls();
  const textControl = useAnimationControls();


  const colorElementsToDefault = async (duration: number, delay: number, goalDepth: number) => {
    leftLineControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay }
    }))
    rightLineControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay  }
    }))
    await circleControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay  }
    }))
  }

  
  const animateLines = () => {
    leftLineControl.start((idx:number) => ({
      stroke: insertNodePath.includes(nodes[idx].leftNode!) ? strokeColor : "#000000",
      pathLength: 1,
      transition: {
        pathLength : { duration: duration, delay: (nodes[idx].depth + 1) * (delay) },
        stroke : { duration: duration, delay: (nodes[idx].depth + 1) * (delay) },
      }
    }))
    rightLineControl.start((idx:number) => ({
      stroke: insertNodePath.includes(nodes[idx].rightNode!) ? strokeColor : "#000000",
      pathLength: 1,
      transition: {
        pathLength : { duration: duration, delay: (nodes[idx].depth + 1)* (delay) },
        stroke : { duration: duration, delay: (nodes[idx].depth + 1) * (delay) },
      }
    }))
  }

  const animateTexts = () => {
    textControl.start(idx => ({
      opacity: 1,
      transition: { duration: duration, delay: nodes[idx].depth == 0 ? (nodes[idx].depth) * (delay) : (nodes[idx].depth + duration) * (delay) }
    }))
  }

  const animateCircles = async (goalDepth: number) => {
    const limitedDelay = (idx:number) => goalDepth * delay > nodes[idx].depth * delay ? nodes[idx].depth * delay : goalDepth * delay;
    await circleControl.start((idx:number) => ({
      stroke: insertNodePath.includes(idx)? strokeColor : "#000000",
      opacity: [idx + 1 == nodes.length ? 0 : 1, 1],
      cx: [idx + 1== nodes.length && nodes[nodes[idx].parentNode]?.left ? nodes[nodes[idx].parentNode].left: nodes[idx].left, nodes[idx].left],
      cy: [idx + 1 == nodes.length && nodes[nodes[idx].parentNode]?.top ? nodes[nodes[idx].parentNode].top: nodes[idx].top, nodes[idx].top],

      transition: { 
        stroke: { duration: duration, delay: limitedDelay(idx) },
        cx: { duration: duration, delay: limitedDelay(idx) },
        cy: { duration: duration, delay: limitedDelay(idx) },
        opacity: { duration: duration/5, delay: limitedDelay(idx)
        }
      }
    }))
  }

  const animateInsert = async(insertNode:Node) => {
    const goalDepth = insertNode.depth;
    
    animateLines();
    animateTexts();
    await animateCircles(goalDepth);

    await colorElementsToDefault(duration, delay, goalDepth);
    setIsAnimating(false);
    setInsertNodePath([rootNode])
        
  }
  const onExport = () => {
    const img = boardRef.current;
    console.log(img);
    if(!img) return;
    domtoimage
      .toBlob(img)
      .then((blob) => {
        saveAs(blob, 'bst.png');
      });
  };
  return (
    <Wrapper>
      <BSTBoard 
        svgRef={svgRef}
        boardRef={boardRef}
        nodes={nodes}
        leftLineControl={leftLineControl}
        rightLineControl={rightLineControl}
        circleControl={circleControl}
        textControl={textControl}
      />
      <BSTController
        onInsertInputPress={(e:any) => onInsertInputPress(e)}
        onRemoveInputPress={(e:any) => onRemoveInputPress(e)}
        insertInput={insertInput}
        removeInput={removeInput}
        reset={() => reset()}

        isAnimationActive={isAnimationActive}
        setIsAnimationActive={(b:any) => setIsAnimationActive(b)}
        isAnimating={isAnimating}
        onExport={() => onExport()}
      />
    </Wrapper>
  );
}



