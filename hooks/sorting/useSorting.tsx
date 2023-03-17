import { SortingValue } from "@/interfaces/types";
import index from "@/utils/sorting/getIndexByOrder";
import getSum from "@/utils/sorting/getSum";
import { useEffect, useState } from "react";

type SortingProps = {
  sortingValues: SortingValue[];
  addValue: Function;
  reset: Function;
  skipBack: Function;
  selectionSort: Function;
  insertionSort: Function;
  bubbleSort: Function;
  quickSort: Function;
  heightScale: number;
};

export default function useSorting(animationSpeed: number): SortingProps {
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
    setSortingValues(savedSortingValues);
  };

  const selectionSort = () => {
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
        }, animationSpeed);
      }, i * 2 * animationSpeed); //어캐했노
    }
  };

  const insertionSort = async () => {
    setHeightScale(0.5);

    const compareValues = (
      copied: SortingValue[],
      order1: number,
      order2: number,
      callback: Function
    ) => {
      const idx1 = index(copied, order1);
      const idx2 = index(copied, order2);

      if (idx2 >= 0 && copied[idx1].value < copied[idx2].value) {
        [copied[idx2].order, copied[idx1].order] = [
          copied[idx1].order,
          copied[idx2].order,
        ];
        setTimeout(() => {
          setSortingValues((v) => (v = [...copied]));
        }, animationSpeed / 5);

        setTimeout(() => {
          compareValues(copied, order1 - 1, order2 - 1, callback);
        }, animationSpeed);
      } else {
        callback();
      }
    };

    const procedure = (order: number) => {
      const i = index(sortingValues, order);
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
        setTimeout(() => procedure(i + 1), (animationSpeed * 4) / 5);
      };
      setTimeout(
        () => compareValues(copied, i, i - 1, callback),
        animationSpeed / 2
      );
    };

    setTimeout(() => procedure(1), animationSpeed);
  };


  const bubbleSort = async () => {
    setHeightScale(1);
    const copied = [...sortingValues];
    let t = 0;

    for (let i = copied.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        const time = t * animationSpeed * 2;
        setTimeout(() => {
          const curr = index(copied, j);
          const prev = index(copied, j + 1);
          copied[curr].highlighted = true;
          copied[prev].highlighted = true;
          setSortingValues((v) => (v = [...copied]));

          setTimeout(() => {
            if (copied[curr].value > copied[prev].value) {
              [copied[curr].order, copied[prev].order] = [
                copied[prev].order,
                copied[curr].order,
              ];
              setSortingValues((v) => (v = [...copied]));
            }
          }, (animationSpeed * 7) / 10);

          setTimeout(() => {
            copied[curr].highlighted = false;
            copied[prev].highlighted = false;
            setSortingValues((v) => (v = [...copied]));
          }, (animationSpeed * 14) / 10);
        }, time);
        t++;
      }
      setTimeout(() => {
        copied[index(copied, i)].sorted = true;
        setSortingValues((v) => (v = [...copied]));
      }, getSum(copied.length - 1, i) * animationSpeed * 2);
    }
  };

  const quickSort = () => {
    const copied = [...sortingValues];
    const recursion = (start: number, end: number) => { // start와 end는 모두 index가 아닌 order
      const pivot = copied[index(copied, start)];
      let left = start + 1;
      let right = end;
      
      while (left <= right) {
        while (index(copied, left) !== -1 && copied[index(copied, left)].value < pivot.value) { left++ }
        while (index(copied, right) !== -1 && copied[index(copied, right)].value > pivot.value) { right-- }

        if (left <= right) {
          [copied[index(copied, left)].order, copied[index(copied, right)].order] = [copied[index(copied, right)].order, copied[index(copied, left)].order]
        }
      }

      if(start < end) {
        [copied[index(copied, start)].order, copied[index(copied, right)].order] = [copied[index(copied, right)].order, copied[index(copied, start)].order]

        recursion(start, right-1);
        recursion(right + 1, end);
      }
    }

    recursion(0, sortingValues.length-1);
    setSortingValues(copied);
  }
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
    selectionSort,
    insertionSort,
    bubbleSort,
    quickSort,
    heightScale,
  };
}
