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
