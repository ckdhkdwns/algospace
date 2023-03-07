import styled from "styled-components";
import Image from "next/image";
import { Slider } from "@mui/material";
import { Ref, useEffect, useState, useRef } from "react";
import { CgRedo } from "react-icons/cg";
import { GoCheck } from "react-icons/go";
import { TbFileExport } from "react-icons/tb";
import { MdAnimation } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

const Wrapper = styled.div`
  display: flex;
  background: #efefef;
  border-radius: 10px;
  position: relative;
  margin: 0 auto 30px;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #DADADA;
`;

const Form = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  all: unset;
  font-size: 18px;
  margin: auto 0;
  width: 150px;
  height: 40px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #CFCFCF;
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.blue};
  }
  &::placeholder {
    color: #7D7D7D;
    font-size: 16px;
  }
`;

const InsertInput = styled(Input)``;

const RemoveInput = styled(Input)``;


const Button = styled.button`
  all: unset;
  width: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 40px;
  background: #D0E3F0;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  transition: 0.1s all;
  svg {
    width: 75%;
    height: 75%;
    margin: auto auto;
    path {
      transition: 0.1s all;
    }
  }
`;
const ResetButton = styled(Button)`
  path {
    fill: ${(props) => props.theme.colors.blue};
  }
  &:hover {
    background: ${(props) => props.theme.colors.blue};
    path {
      fill: #efefef;
    }
  }
`;

const ToggleAnimation = styled(Button) <{ isAnimationActive: Boolean }>`
  cursor: pointer;
  display: flex;
  svg {
    width: 75%;
    height: 75%;
    path {
      color: ${props => props.isAnimationActive ? props.theme.colors.blue : "#999999"}
    }
  }
`;


const ExportButton = styled(Button)`
  svg {
    width: 70%;
    height: 70%;
  }
  path + path {
    stroke: ${(props) => props.theme.colors.blue};
  }
  &:hover {
    background: ${(props) => props.theme.colors.blue};;
    path + path {
      stroke: #efefef;
    }
  }
`;

const More = styled.div`
  display: flex;
  gap: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: #CFCFCF;
`
type BSTControllerProps = {
  onInsertInputPress: Function;
  onRemoveInputPress: Function;
  reset: Function;
  isAnimationActive: Boolean;
  setIsAnimationActive: Function;
  isAnimating: Boolean;
  setIsModalOpen: Function;
};

export default function BSTController({
  onInsertInputPress,
  onRemoveInputPress,
  reset,
  isAnimationActive,
  setIsAnimationActive,
  isAnimating,
  setIsModalOpen,
}: BSTControllerProps) {
  return (
    <Wrapper>
      <Form>
        <InsertInput
          placeholder="Insert"
          onKeyPress={(e) => onInsertInputPress(e)}
          disabled={isAnimating ? true : false}
        />
        <RemoveInput
          disabled={isAnimating ? true : false}
          placeholder="Remove"
          onKeyPress={(e) => onRemoveInputPress(e)}
        />
      </Form>
      <Divider />
      <More>
        <ResetButton onClick={() => reset()}>
          <CgRedo />
        </ResetButton>
        <ToggleAnimation
          isAnimationActive={isAnimationActive}
          onClick={() => {
            if (!isAnimating) setIsAnimationActive(!isAnimationActive);
          }}
        >
          <MdAnimation />
        </ToggleAnimation>
        <ExportButton onClick={() => setIsModalOpen(true)}>
          <TbFileExport />
        </ExportButton>
      </More>
    </Wrapper>
  );
}
