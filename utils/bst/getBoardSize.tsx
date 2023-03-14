import { RefObject } from "react";

export const getBoardSize = (boardRef: RefObject<HTMLElement>) => {
    const width = boardRef?.current && boardRef.current.getBoundingClientRect().width;
    const height = boardRef?.current && boardRef.current.getBoundingClientRect().height;
    
    if(!width) throw new Error;
    return {
        width: width,
        height: height
    }
}