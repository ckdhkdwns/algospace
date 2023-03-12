import { SortingValue } from "@/interfaces/types";
import { useEffect, useState } from "react";

type SortingProps = {
  sortingValues: SortingValue[];
  addValue: Function;
  reset: Function;
  skipBack: Function;
  selectionSorting: Function;
  insertionSorting: Function;
  heightScale: number;
};

export default function useSorting(): SortingProps {
  const [sortingValues, setSortingValues] = useState<SortingValue[]>([]);
  const [savedSortingValues, setSavedSortingValues] = useState<SortingValue[]>(
    []
  );
  const [heightScale, setHeightScale] = useState(1);

  const reset = () => {
    setSavedSortingValues([]);
    setSortingValues([]);
  };

  const skipBack = () => {
    console.log(savedSortingValues);
    setSortingValues(savedSortingValues);
  };

  const selectionSorting = () => {
    setHeightScale(1);
    for (let i = 0; i < sortingValues.length; i++) {
      setTimeout(() => {
        let minValue = Infinity;
        let minValueIndex = 0;
        sortingValues.map((sortingValue, index) => {
          if (!sortingValue.sorted && sortingValue.value < minValue) {
            minValue = sortingValue.value;
            minValueIndex = index;
          }
        });
        const copiedSortingValues = [...sortingValues];

        copiedSortingValues[minValueIndex].highlighted = true;
        setSortingValues((values) => (values = [...copiedSortingValues]));

        setTimeout(() => {
          copiedSortingValues.map((value) => {
            if (value.order == i)
              value.order = copiedSortingValues[minValueIndex].order;
          });
          copiedSortingValues[minValueIndex].order = i;
          copiedSortingValues[minValueIndex].sorted = true;
          setSortingValues((values) => (values = [...copiedSortingValues]));
        }, 1000);
      }, i * 2000); //어캐했노
    }
  };

  const orderToIndex = (values: SortingValue[], order: number) => {
    let result = -1;
    values.map((v, i) => {
      if (order == v.order) result = i;
    });
    return result;
  };

  const insertionSorting = async () => {
    setHeightScale(0.5);

    const compareValues = (
      copied: SortingValue[],
      order1: number,
      order2: number,
      callback: Function
    ) => {
      const idx1 = orderToIndex(copied, order1);
      const idx2 = orderToIndex(copied, order2);

      if (idx2 >= 0 && copied[idx1].value < copied[idx2].value) {
        [copied[idx2].order, copied[idx1].order] = [
          copied[idx1].order,
          copied[idx2].order,
        ];
        setTimeout(() => {
          setSortingValues((v) => (v = [...copied]));
        }, 200);
        
        setTimeout(() => {
          compareValues(copied, order1 - 1, order2 - 1, callback);
        }, 1000);
      } else {
        callback();
      }
    };

    const procedure = (order: number) => {
      const i = orderToIndex(sortingValues, order);
      if (i == -1) {
        setSortingValues((values) => [
          ...values.map((v) => {
            v.sorted = true;
            return v;
          }),
        ]);
        return;
      }
      
      const copied = [...sortingValues];
      copied[i].upper = true;
      copied[i].highlighted = true;
      setSortingValues((v) => (v = copied));

      const callback = () => {
        copied[i].upper = false;
        copied[i].highlighted = false;
        setSortingValues((v) => (v = copied));
        setTimeout(() => procedure(i + 1), 800);
      };
      setTimeout(() => compareValues(copied, i, i - 1, callback), 500);
    };
  
    setTimeout(() => procedure(1), 1000);
  };

  const addValue = (n: number) => {
    setSavedSortingValues([
      ...savedSortingValues,
      {
        value: n,
        order: sortingValues.length,
        sorted: false,
        highlighted: false,
        upper: false,
      },
    ]);
    setSortingValues([
      ...sortingValues,
      {
        value: n,
        order: sortingValues.length,
        sorted: false,
        highlighted: false,
        upper: false,
      },
    ]);
  };

  return {
    sortingValues,
    addValue,
    reset,
    skipBack,
    selectionSorting,
    insertionSorting,
    heightScale,
  };
}
