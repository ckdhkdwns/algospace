import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion"
import { Node, Position } from "interfaces/types";
import { NonEmptyArray } from "interfaces/interfaces";

const Wrapper = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;

  flex-direction: column;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  height: 90vh;
`;
const Header = styled.div`
  display: flex;
  margin: 10px 0px;
`;
const Insert = styled.div``;
const InsertInput = styled.input`
  all: unset;
`;

const Remove = styled.div``;
const RemoveInput = styled.input``;

const Main = styled.div`
  border-radius: 10px;
  display: flex;
`;
const Board = styled.div`
  display: flex;

  width: 80%;
  height: 100%;

  border-radius: 10px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 700;
  img {
    margin: 0 10px 0 20px;
  }
`;

const Controller = styled.div`
  border-left: 1px solid #afafaf;
  width: 20%;
  height: 100%;
  background: #ffffff;
  border-radius: 0 10px 10px 0;
`;

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

  const nodesXGap = 8;
  const nodesYGap = 70;
  const maxDepth = 5;
  const rootNodeMarginTop = 100;

  const getXPositionOfElement = (element:RefObject<HTMLDivElement>) => {
    if(element.current) return element?.current?.offsetWidth / 2;
    else return 400;
  }

  const insertNodeIntoBST = (
    insertValue: number,
    index: number | null,
    depth: number,
    x: number
  ) => {
    if (index === null) return;
    if (nodes.length == rootNode) {
      // 삽입하려는 노드가 첫번째 노드 (root node)라면
      setNodes([
        {
          value: (insertValue *= 1),
          leftNode: null,
          rightNode: null,

          top: rootNodeMarginTop,
          left: getXPositionOfElement(boardRef),
          active: true,
        },
      ]);
      return;
    }
    if (insertValue < nodes[index].value) {
      if (nodes[index].leftNode) {
        insertNodeIntoBST(
          insertValue,
          nodes[index].leftNode,
          depth + 1,
          x - 2 ** (maxDepth - depth)
        );
      } else {
        nodes[index].leftNode = nodes.length;
        setNodePosition([
          ...nodePosition,
          {
            index: nodes.length,
            top: nodes[index].top + nodesYGap,
            left: nodes[index].left - x * nodesXGap,
          },
        ]);
        setNodes([
          ...nodes,
          {
            value: (insertValue *= 1),
            leftNode: null,
            rightNode: null,

            top: nodes[index].top,
            left: nodes[index].left,
            active: true,
          },
        ]);
      }
    } else {
      if (nodes[index].rightNode) {
        insertNodeIntoBST(
          insertValue,
          nodes[index].rightNode,
          depth + 1,
          x - 2 ** (maxDepth - depth)
        );
      } else {
        nodes[index].rightNode = nodes.length;
        setNodePosition([
          ...nodePosition,
          {
            index: nodes.length,
            top: nodes[index].top + nodesYGap,
            left: nodes[index].left + x * nodesXGap,
          },
        ]);
        setNodes([
          ...nodes,
          {
            value: (insertValue *= 1),
            leftNode: null,
            rightNode: null,

            top: nodes[index].top,
            left: nodes[index].left,
            active: true,
          },
        ]);
      }
    }
  };


  function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
    return arr.length > 0;
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
    const successorIndex = indexs[1];

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
        nodes.map((node, idx) => {
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
    if(nodes.length == 0) return;
    
    nodePosition.map((item) => {
      nodes[item.index].top = item.top;
      nodes[item.index].left = item.left;
      
    });
    setNodePosition([]);
  }, [nodes]);

  const onInsertInputPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        insertNodeIntoBST(e.target.value, rootNode, 1, 2 ** maxDepth);
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
  };
  
  return (
    <Wrapper>
      <Header>
        <Title>
          <Image src="/bst-mini.svg" alt="bst" width="45" height="45" />
          Binary Search Tree
        </Title>
      </Header>
      <Main>
        <Board id="board" ref={boardRef}>
          <motion.svg  width="100%" height="80vh">
            {nodes.map((node) => {
              if (!node.active) return null;
              return (
                <g>
                  {node.leftNode ? (
                    <Line
                      x1={node.left}
                      y1={node.top}
                      x2={nodes[node.leftNode].left}
                      y2={nodes[node.leftNode].top}
                      initial={{ stroke: "#FF5733", pathLength: 0 }}
                      animate={{ stroke: "#000000", pathLength: 1 }}
                      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
                    />
                  ) : (
                    ""
                  )}
                  {node.rightNode ? (
                    <Line
                      x1={node.left}
                      y1={node.top}
                      x2={nodes[node.rightNode].left}
                      y2={nodes[node.rightNode].top}
                      initial={{ stroke: "#FF5733", pathLength: 0 }}
                      animate={{ stroke: "#000000", pathLength: 1 }}
                      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 } }}
                    />
                  ) : (
                    ""
                  )}
                </g>
              );
            })}
            {nodes.map((node, idx) => {
              if (!node.active) return null;
              return (
                <g>
                  <Circle
                      style={{ 

                      }}
                      initial={{  stroke: "#FF5733", x: node.left, y: node.top }}
                      animate={{  stroke: "#000000", x: node.left, y: node.top  }}
                      transition={{ duration: 0.5, stroke: { delay: 1, duration: 0.5 }}}
                       r="20" />
                  <Text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1  }}
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
          <Insert>
            Insert{" "}
            <InsertInput onKeyPress={onInsertInputPress} ref={insertInput} />
          </Insert>
          <Remove>
            Remove{" "}
            <RemoveInput onKeyPress={onRemoveInputPress} ref={removeInput} />
          </Remove>
          <button onClick={() => reset()}>Reset</button>
        </Controller>
      </Main>
    </Wrapper>
  );
}

