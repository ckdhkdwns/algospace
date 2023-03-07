import styled from "styled-components";
import {
  AnimationControls,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Node, SortingValue } from "interfaces/types";
import ValueBar from "./elements/valueBar";
import { SORTING_GAP, SORTING_WIDTH } from "@/interfaces/constants";
import Router from "next/router";
import Image from "next/image";
import { MdArrowBackIosNew } from "react-icons/md";

const Board = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  width: fit-content;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 25px;
  gap: 10px;
  color: ${(props) => props.theme.colors.black};

  img {
    margin: 10px auto;
  }
`;

const BackButton = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  margin: auto auto;
  display: flex;
  border-radius: 10px;
  transition: 0.2s all;
  svg {
    margin: auto auto;
  }
  &:hover {
    background: ${props => props.theme.colors.gray100}
  }
`

const ImageWrapper = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 10px;
  margin: auto 0;
  img {
    margin: auto auto;
  }

`
const Title = styled.div`
  line-height: 60px;
  font-size: 30px;
`;
const Svg = styled(motion.svg)`
  width: auto;
  height: 80%;
  margin: auto auto;
  transform: scaleY(-1);
`;

type SortingBoardProps = {
  sortingValues: SortingValue[];
};
export default function SortingBoard({ sortingValues }: SortingBoardProps) {
  const [maxValue, setMaxValue] = useState<number>(1);
  const boardRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(0);

  // 최대값을 기준으로 나머지 value bar 높이 맞추기 (%)
  useEffect(() => {
    const values = sortingValues.map((sortingValue) => sortingValue.value);
    setMaxValue(Math.max(...values));
    setSvgWidth(
      sortingValues.length * SORTING_WIDTH +
        (sortingValues.length - 1) * SORTING_GAP
    );
  }, [sortingValues]);

  return (
    <Board>
      <Header>
        <BackButton onClick={() => Router.push("/")}> <MdArrowBackIosNew /></BackButton>
        <ImageWrapper >
          <Image src="/sorting-mini.svg" alt="sorting" width="35" height="35" />
        </ImageWrapper>

        <Title>Sorting</Title>
      </Header>
      <Svg
        transition={{ duration: 0.2 }}
        initial={{ width: svgWidth }}
        animate={{ width: svgWidth }}
        ref={boardRef}
      >
        {sortingValues.map((sortingValue, index) => {
          return (
            <ValueBar
              sortingValue={sortingValue}
              maxValue={maxValue}
            ></ValueBar>
          );
        })}
      </Svg>
    </Board>
  );
}
