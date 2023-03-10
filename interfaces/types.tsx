import { AnimationControls } from "framer-motion";

export type Node = {
  value: number;
  
  parentNode: number;
  leftNode: number | null;
  rightNode: number | null;

  depth: number;
  
  position: Position;
  removed: boolean;
};

export type Position = {
  top: number;
  left: number;
};

export type BSTControls = {
  circle: AnimationControls,
  leftLine: AnimationControls,
  rightLine: AnimationControls,
  text: AnimationControls
}

export type SortingValue = {
  value: number;
  order: number;
  sorted: boolean;
  highlighted: boolean;
  upper: boolean;
}