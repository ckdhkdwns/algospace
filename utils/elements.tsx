import { RefObject } from "react";



export const getElementWidth = (element: RefObject<HTMLDivElement>) => {
    if (element.current) return element.current.getBoundingClientRect().width;
  }

export const getElementHeight = (element: RefObject<HTMLDivElement>) => {
    if (element.current) return element.current.getBoundingClientRect().height;
  }