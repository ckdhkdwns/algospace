import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AnimationControls, motion, useAnimation, useAnimationControls } from "framer-motion"
import { Node, Position } from "interfaces/types";
import { NonEmptyArray } from "interfaces/interfaces";

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
const Header = styled.div`
  display: flex;
  margin: 10px 0px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10px;
  box-sizing: border-box;
  &:focus {
    background: #BDBDBD;
  }
`
const Insert = styled(Form)`
    position: relative;
`;
const Remove = styled(Form)`
`;

const Input = styled.input`
  all: unset;
  font-size: 30px;
  padding: 35px 20px 10px 20px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.gray200};
  box-sizing: border-box;
  &:focus {
    border: 2px solid gray;
    padding: 33px 18px 8px 18px;
  }
`

const InputTitle = styled.div`
  position: absolute;
    color: #616161;
    margin: 8px 15px;
`
const InsertInput = styled(Input)`
`;

const RemoveInput = styled(Input)``;

const Board = styled.div`
  display: flex;
  width: 85%;
  height: 90%;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  width: fit-content;
  font-size: 20px;
  font-weight: 700;
  width: fit-content;
    
    flex-direction: column;
    font-weight: 700;
    margin: 10px auto 20px;
  img {
    margin: 10px auto;
  }
`;

const Controller = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.gray200};
  width: 15%;
  height: 100%;
  background: ${(props) => props.theme.colors.gray100};
  border-radius: 0 10px 10px 0;
`;

const ResetButton = styled.button`
  all: unset;
    width: -webkit-fill-available;
    background: ${(props) => props.theme.colors.brightBlue};
    border-radius: 10px;
    height: 50px;
    margin: 0px 10px;
    text-align: center;
    font-size: 18px;
    transition: 0.2s all;
    &:hover {
      
      background: ${(props) => props.theme.colors.translucentBlue};
    }
`
const Circle = styled(motion.circle)`
  fill: #ffffff;
  stroke-width: 3px;
`;
const Line = styled(motion.line)`
  stroke-width: 3px;
  
`;

const Text = styled(motion.text)`
  font-size: 22px;
  font-weight: 700;
  alignment-baseline: middle;
  text-anchor: middle;
  transition: 0.2s all;
`;



export default function BinarySearchTree() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [rootNode, setRootNode] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const insertInput = useRef<HTMLInputElement>(null);
  const removeInput = useRef<HTMLInputElement>(null);
  const [nodePosition, setNodePosition] = useState<Position[]>([]);
  const [insertNodePath, setInsertNodePath] = useState([rootNode]);

  const XGAP = 8;
  const YGAP = 70;
  const MAX_DEPTH = 5;
  const rootNodeMarginTop = 100;

  const DEFAULT_POSITION = 400;

  const getXPositionOfElement = (element: RefObject<HTMLDivElement>) => {
    
    if (element.current) return element?.current?.offsetWidth / 2;
    else return DEFAULT_POSITION;
  }

  const appendLeftChild = (parentNode:Node, value: number, xPosition: number) => {
    setNodes([
      ...nodes,
      {
        value: value,

        parentNode: parentNode,
        leftNode: null,
        rightNode: null,

        depth: parentNode.depth + 1,
        top: parentNode.top + YGAP,
        left: parentNode.left - xPosition * XGAP,
        active: true,
      },
    ]);
  }

  const appendRightChild = (parentNode: Node, value: number, xPosition: number) => {
    setNodes([
      ...nodes,
      {
        value: value,

        parentNode: parentNode,
        leftNode: null,
        rightNode: null,

        depth: parentNode.depth + 1,
        top: parentNode.top + YGAP,
        left: parentNode.left + xPosition * XGAP,
        active: true,
      },
    ]);
  }
  
  const appendRootNode = (value: number) => {
    setNodes([
      {
        value: value,
        
        parentNode: null,
        leftNode: null,
        rightNode: null,

        depth: 0,
        top: rootNodeMarginTop,
        left: getXPositionOfElement(boardRef),
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
        appendLeftChild(nodes[index], insertValue, xPosition);
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
        appendRightChild(nodes[index], insertValue, xPosition);
        path.push(nodes.length);
        setInsertNodePath(path);
      }
    }    
    
  };


  function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
    return arr.length > 0;
  }

  const getRemoveIndex = (value:number) => {

  }

  const getRemoveIndexAndSuccessorIndex = (value: number) => {
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
    const indexs: number[] = getRemoveIndexAndSuccessorIndex(removeValue);
    const removeIndex: number = indexs[0];
    const successorIndex: number = indexs[1];

    nodes[removeIndex].active = false;

    // case 0: node to be removed is last node
    if (successorIndex == -1) {
      setNodes(
        nodes.map((node, idx) => {
          if (node.rightNode == removeIndex) {
            node.rightNode = null;
          }
          return node;
        })
      );
      return;
    }
    // case 1 : node to be removed have tho children
    if (
      nodes[removeIndex].leftNode !== null &&
      nodes[removeIndex].rightNode !== null
    ) {
      setNodes(
        nodes.map((node, idx) => {
          if (node.leftNode == removeIndex) node.leftNode = successorIndex;
          if (node.rightNode == removeIndex) node.rightNode = successorIndex;

          if (idx == successorIndex) {
            if (nodes[removeIndex].leftNode !== successorIndex)
              node.leftNode = nodes[removeIndex].leftNode;
            if (nodes[removeIndex].rightNode !== successorIndex)
              node.rightNode = nodes[removeIndex].rightNode;
            node.top = nodes[removeIndex].top;
            node.left = nodes[removeIndex].left;
          }
          return node;
        })
      );
    }
    // case 2 : node to be removed has only left child
    else if (nodes[removeIndex].leftNode !== null) {
      const leftIndex: number | null = nodes[removeIndex].leftNode;
      if (leftIndex !== null) {
        nodes[leftIndex].top = nodes[removeIndex].top;
        nodes[leftIndex].left = nodes[removeIndex].left;
      }
      setNodes(
        nodes.map((node, idx) => {
          if (node.leftNode == removeIndex)
            node.leftNode = nodes[removeIndex].leftNode;
          if (node.rightNode == removeIndex)
            node.rightNode = nodes[removeIndex].leftNode;
          return node;
        })
      );
    }
    // case 3 : node to be removed has only right child
    else if (nodes[removeIndex].rightNode !== null) {
      const rightIndex: number | null = nodes[removeIndex].rightNode;
      if (rightIndex !== null) {
        nodes[rightIndex].top = nodes[removeIndex].top;
        nodes[rightIndex].left = nodes[removeIndex].left;
      }
      setNodes(
        nodes.map((node, idx) => {
          if (node.rightNode == removeIndex)
            node.rightNode = nodes[removeIndex].rightNode;
          if (node.rightNode == removeIndex)
            node.rightNode = nodes[removeIndex].rightNode;
          return node;
        })
      );
    }

    // case 4: node to be removed doesn't have any children
    else {
      setNodes(
        nodes.map((node) => {
          if (node.leftNode == removeIndex) {
            node.leftNode = null;
          }
          if (node.rightNode == removeIndex) {
            node.rightNode = null;
          }
          return node;
        })
      );
    }
  };

  useEffect(() => {
    if (nodes.length == 0) return;

    nodePosition.map((item) => {
      nodes[item.index].top = item.top;
      nodes[item.index].left = item.left;

    });
    setNodePosition([]);
  }, [nodes]);

  useEffect(() => {
    
    console.log(nodes);
    if (nodes.length == 0) return;
    animateInsert(nodes[nodes.length-1]);
  }, [nodes])

  useEffect(() => {
    console.log(insertNodePath);
  }, [insertNodePath])

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
    setNodePosition([]);
    setInsertNodePath([0]);
  };

  const circleControl = useAnimationControls();
  const leftLineControl = useAnimationControls();
  const rightLineControl = useAnimationControls();
  const textControl = useAnimationControls();

  const colorElementsToDefault = (duration: number, delay: number, goalDepth: number) => {
    leftLineControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay }
    }))
    rightLineControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay  }
    }))
    circleControl.start(idx => ({
      stroke: "#000000",
      transition: { duration: duration, delay: delay  }
    }))
  }

  const animateInsert = async(insertNode:Node) => {
    const goalIndex = nodes.length - 1;
    const goalDepth = insertNode.depth;
    
    const DELAY = 1;
    const DURATION = 0.5;

    leftLineControl.start((idx:number) => ({
      stroke: insertNodePath.includes(nodes[idx].leftNode!) ? "#FF5733" : "#000000",
      pathLength: 1,
      transition: {
        pathLength : { duration: DURATION, delay: (nodes[idx].depth + 1) * (DELAY) },
        stroke : { duration: DURATION, delay: (nodes[idx].depth + 1) * (DELAY) },
      }
    }))
    rightLineControl.start((idx:number) => ({
      stroke: insertNodePath.includes(nodes[idx].rightNode!) ? "#FF5733" : "#000000",
      pathLength: 1,
      transition: {
        pathLength : { duration: DURATION, delay: (nodes[idx].depth + 1)* (DELAY) },
        stroke : { duration: DURATION, delay: (nodes[idx].depth + 1) * (DELAY) },
      }
    }))

    textControl.start(idx => ({
      opacity: 1,
      transition: { duration: DURATION, delay: nodes[idx].depth == 0 ? (nodes[idx].depth) * (DELAY) : (nodes[idx].depth + DURATION) * (DELAY) }
    }))

    
    await circleControl.start((idx:number) => ({
      stroke: insertNodePath.includes(idx)? "#FF5733" : "#000000",
      opacity: [idx + 1 == nodes.length ? 0 : 1, 1],
      cx: [idx + 1== nodes.length && nodes[idx].parentNode?.left ? nodes[idx].parentNode?.left: nodes[idx].left, nodes[idx].left],
      cy: [idx + 1 == nodes.length && nodes[idx].parentNode?.top ? nodes[idx].parentNode?.top: nodes[idx].top, nodes[idx].top],

      transition: { 
        stroke: {
          duration: DURATION, delay: goalDepth * DELAY > nodes[idx].depth * DELAY ? nodes[idx].depth * DELAY : goalDepth * DELAY
        },
        cx: {
          duration: DURATION, delay: goalDepth * DELAY > nodes[idx].depth * DELAY ? nodes[idx].depth * DELAY : goalDepth * DELAY
        },
        cy: {
          duration: DURATION, delay: goalDepth * DELAY > nodes[idx].depth * DELAY ? nodes[idx].depth * DELAY : goalDepth * DELAY
        },
        opacity: {
          duration: DURATION/5, delay: goalDepth * DELAY > nodes[idx].depth * DELAY ? nodes[idx].depth * DELAY : goalDepth * DELAY
        }
      }
    })).then(() => {
      colorElementsToDefault(DURATION, DELAY, goalDepth);
    })
    setInsertNodePath([rootNode])
  }

  const leftLineElement = (idx:number) => {
    const node = nodes[idx];
    if(!node.leftNode) return;
    return <Line
      x1={node.left}
      y1={node.top}
      x2={nodes[node.leftNode].left}
      y2={nodes[node.leftNode].top}
      initial={{ stroke: "#FF5733", pathLength: 0 }}
      animate={leftLineControl}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
  }
  
  const rightLineElement = (idx:number) => {
    const node = nodes[idx];
    if(!node.rightNode) return;
    return <Line
      x1={node.left}
      y1={node.top}
      x2={nodes[node.rightNode].left}
      y2={nodes[node.rightNode].top}
      initial={{ stroke: "#FF5733", pathLength: 0 }}
      animate={rightLineControl}
      custom={idx}
      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
    />
  }

  return (
    <Wrapper>
      <Board id="board" ref={boardRef}>
        
        <motion.svg width="100%" height="80vh">
          {nodes.map((node, idx) => {
            if (!node.active) return null;
            return (
              <g>
                {leftLineElement(idx)}
                {rightLineElement(idx)}
              </g>
            );
          })}
          <Line 
            initial={{ stroke: "#FF5733", pathLength: 0 }}
            
          />
          {nodes.map((node, idx) => {
            if (!node.active) return null;
            return (
              
              <g>
                <Circle
                  className={"circle"+idx}
                  custom={idx}
                  initial={{ stroke: "#FF5733"}}
                  animate={circleControl}
                  transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
                  r="20" />
                <Text
                  initial={{ opacity: 0 }}
                  custom={idx}
                  animate={textControl}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  id={"text" + idx} x={node.left} y={node.top + 2}>
                  {node.value}
                </Text>
              </g>
            );
          })}
        </motion.svg>
      </Board>
      <Controller>
        <Title>
          <Image src="/bst.svg" alt="bst" width="125" height="125" />
          Binary Search Tree
        </Title>
        <Insert>
          <InputTitle>Insert</InputTitle>
          <InsertInput onKeyPress={onInsertInputPress} ref={insertInput} />
        </Insert>
        <Remove>
          <InputTitle>Remove</InputTitle>
          <RemoveInput onKeyPress={onRemoveInputPress} ref={removeInput} />
        </Remove>
        <ResetButton onClick={() => reset()}>Reset</ResetButton>
      </Controller>
    </Wrapper>
  );
}



