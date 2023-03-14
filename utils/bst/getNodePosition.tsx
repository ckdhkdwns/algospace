import { RefObject } from "react";
import { getBoardSize } from "./getBoardSize";

export const getNodePosition = (boardRef: RefObject<HTMLDivElement>, directions:string[]) => {
    const depth = directions.length;
    const MAX_DEPTH = 6;

    const { width, height } = getBoardSize(boardRef);
    const XGAP = width * 0.95;
    const YGAP = Math.floor(height! / MAX_DEPTH);

    let top = YGAP / 2;
    let left = width / 2;
    if(depth == 0) return {
      top: top,
      left: left
    };
    for(let i=0;i<depth;i++) {
      top += YGAP;
      if(directions[i] == "L") left -= XGAP / (2 ** (i + 2));
      else left += XGAP / (2 ** (i + 2));
    }
    return {
      top: top,
      left: left
    };
  }