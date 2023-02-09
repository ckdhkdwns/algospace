export type Node = {
  value: number;
  
  parentNode: number;
  leftNode: number | null;
  rightNode: number | null;

  depth: number;
  
  top: number;
  left: number;
  active: boolean;
};

export type Position = {
  index: number;
  top: number;
  left: number;
};
