import { debounce } from "@mui/material";
import { RefObject, useEffect, useState } from "react";

type GapsProps = [number, number];

const useGaps = (boardRef: RefObject<HTMLDivElement>): GapsProps => {
  const [XGAP, setXGAP] = useState<number>(0);
  const [YGAP, setYGAP] = useState<number>(0);
  const MAX_DEPTH = 6;

  const init = () => {
    const width =
      boardRef?.current && boardRef.current.getBoundingClientRect().width;
    const height =
      boardRef?.current && boardRef.current.getBoundingClientRect().height;
    setXGAP(width! / 2 ** (MAX_DEPTH + 2.1));
    setYGAP(Math.floor(height! / MAX_DEPTH));
  };
  useEffect(() => {
    init();
    const handleResize = debounce(() => init(), 500);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boardRef]);

  return [XGAP, YGAP];
};

export default useGaps;
