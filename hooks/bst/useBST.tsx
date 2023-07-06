import { RefObject, useEffect, useState } from "react";
import { Node, Position } from "interfaces/types";
import { getNodePosition } from "../../utils/bst/getNodePosition";
import { NonEmptyArray } from "@/interfaces/interfaces";

type BSTProps = {
  nodes: Node[];
  insertNode: Function;
  removeNode: Function;
  resetNodes: Function;
  replaceNodes: Function;
  insertPath: number[];
  resetInsertPath: Function;
  nodeChanges: Boolean
};

function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
  return arr.length > 0;
}

const useBST = (boardRef: RefObject<HTMLDivElement>): BSTProps => {
  const [rootNode, setRootNode] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [insertPath, setInsertPath] = useState([rootNode]);
  const [nodeChanges, setNodeChanges] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  type appendChildProps = {
    parentNode: number;
    value: number;
    position: Position;
  };

  // 초기 노드들을 랜덤으로 생성 
  useEffect(() => {
    if(!isInitializing || nodes.length >= 10) {
      setIsInitializing(false);
      return
    }
    insertNode(Math.floor(Math.random()* 100) + 1);
  }, [nodes]);

  useEffect(() => {
    if(!isInitializing) replaceNodes(nodes);
  }, [isInitializing])
  // 여기까지

  const appendChild = ({ parentNode, value, position }: appendChildProps) => {
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
  };

  const insertNode = (insertValue: number) => {
    if (nodes.length == rootNode) {
      // 삽입하려는 노드가 첫번째 노드 (root node)라면
      appendChild({
        parentNode: -1,
        value: insertValue,
        position: getNodePosition(boardRef, []),
      });
      return;
    }
    const recursion = (
      currentNode: number,
      directions: string[],
      path: number[]
    ) => {
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
            position: getNodePosition(boardRef, [...directions, "L"]),
          });
          path.push(nodes.length);
          setInsertPath(path);
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
            position: getNodePosition(boardRef, [...directions, "R"]),
          });
          path.push(nodes.length);
          setInsertPath(path);
        }
      }
    };
    recursion(rootNode, [], [rootNode]);
  };

  const replaceNodes = (nodes: Node[]) => {
    if(isInitializing) return;
    const copiedNodes = [...nodes];
    const recursion = (index: number | null, directions: string[]) => {
      if (index == null) return;
      if (index == rootNode)
        copiedNodes[rootNode].position = getNodePosition(boardRef, []);
      else {
        copiedNodes[index].position = getNodePosition(boardRef, directions);
        copiedNodes[index].depth = directions.length;
      }
      recursion(copiedNodes[index].leftNode, [...directions, "L"]);
      recursion(copiedNodes[index].rightNode, [...directions, "R"]);
    };
    if (nodes.length !== 0) recursion(rootNode, []);
    setNodes([...copiedNodes]);
  };

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
    const isLeftNode =
      copiedNodes[removeIndex].value < copiedNodes[parentIndex].value;
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
      else
        copiedNodes[parentIndex].rightNode = copiedNodes[removeIndex].leftNode;
      copiedNodes[removeNode.leftNode!].parentNode = removeNode.parentNode;
    }
    // case 3 : node to be removed has only right child
    else if (copiedNodes[removeIndex].rightNode !== null) {
      if (isLeftNode)
        copiedNodes[parentIndex].leftNode = copiedNodes[removeIndex].rightNode;
      else
        copiedNodes[parentIndex].rightNode = copiedNodes[removeIndex].rightNode;
      copiedNodes[removeNode.rightNode!].parentNode = removeNode.parentNode;
    }
    // case 4: node to be removed doesn't have any children
    else {
      if (isLeftNode) copiedNodes[parentIndex].leftNode = null;
      else copiedNodes[parentIndex].rightNode = null;
    }
    replaceNodes(copiedNodes);
  };

  const resetNodes = () => {
    setNodes([]);
    setInsertPath([0]);
  };

  const resetInsertPath = () => {
    setInsertPath([rootNode]);
  }
  
  return {
    nodes,
    insertNode,
    removeNode,
    resetNodes,
    replaceNodes,
    insertPath,
    resetInsertPath,
    nodeChanges
  };
};

export default useBST;
