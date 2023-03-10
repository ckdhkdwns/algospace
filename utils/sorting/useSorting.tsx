import { SortingValue } from "@/interfaces/types";
import { useState } from "react";

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

  const insertionSorting = () => {
    setHeightScale(0.5);
  }

  const addValue = (n: number) => {
    setSavedSortingValues([
      ...savedSortingValues,
      {
        value: n,
        order: sortingValues.length,
        sorted: false,
        highlighted: false,
        upper: false
      },
    ]);
    setSortingValues([
      ...sortingValues,
      {
        value: n,
        order: sortingValues.length,
        sorted: false,
        highlighted: false,
        upper: false
      },
    ]);
  };

  return { sortingValues, addValue, reset, skipBack, selectionSorting, insertionSorting, heightScale };
}
