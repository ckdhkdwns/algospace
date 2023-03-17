import { SortingValue } from "@/interfaces/types";

export default function getIndexByOrder(values: SortingValue[], order: number) {
  let result = -1;
  values.map((v, i) => {
    if (order == v.order) result = i;
  });
  return result;
}
