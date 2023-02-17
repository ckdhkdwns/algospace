import { RefObject, useEffect, useState } from "react";
import { Node, Position } from "interfaces/types";

type BSTProps = [Function, Function, Function, number[]];

const useBST = ():BSTProps => {
    const [rootNode, setRootNode] = useState<number>(0);
    const [nodes, setNodes] = useState<Node[]>([]);
}

export default useBST;