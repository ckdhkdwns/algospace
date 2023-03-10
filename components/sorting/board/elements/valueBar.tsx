import { SORTING_GAP, SORTING_WIDTH } from "@/interfaces/constants";
import { SortingValue } from "@/interfaces/types";
import { motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.g)``;
const Bar = styled(motion.rect)<{ width: number }>`
  width: ${(props) => props.width + "px"};
`;

const Text = styled(motion.text)`
  transform: scaleY(-1);
  text-anchor: middle;
`;

type ValueBarProps = {
  sortingValue: SortingValue;
  height: string;
};

export default function ValueBar({ sortingValue, height }: ValueBarProps) {
  const x = sortingValue.order * (SORTING_WIDTH + SORTING_GAP);
  useEffect(() => {
    console.log(height);
  })
  return (
    <Wrapper transition={{ x: { duration: 0.4 } }} animate={{ x: x }}>
      <Bar
        y={35}
        initial={{ height: 0 }}
        transition={{ height: { duration: 0.4, delay: 0.4 } }}
        animate={{
          height: height,
          fill: sortingValue.sorted
            ? "#17A590"
            : sortingValue.highlighted
            ? "#F4D03F"
            : "#BDBDBD",
        }}
        width={SORTING_WIDTH}
      ></Bar>
      <Text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { delay: 0.4 } }}
        x={SORTING_WIDTH / 2}
        y={-10}
      >
        {sortingValue.value}
      </Text>
    </Wrapper>
  );
}
