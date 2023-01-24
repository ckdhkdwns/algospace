export type Node = {
  value: number;

  leftNode: number | null;
  rightNode: number | null;

  top: number;
  left: number;
  active: boolean;
};

export type Position = {
  index: number;
  top: number;
  left: number;
};
