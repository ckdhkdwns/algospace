import styled from "styled-components";
import Image from "next/image";
import { Slider } from "@mui/material";
import { Ref, useEffect, useState, useRef } from "react";
import { CgRedo } from "react-icons/cg";
import { GoCheck } from "react-icons/go";
const Form = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  &:focus {
    background: #bdbdbd;
  }
`;
const Insert = styled(Form)`
  position: relative;
`;
const Remove = styled(Form)`
  margin-bottom: 15px;
`;

const Input = styled.input`
  all: unset;
  font-size: 18px;
  width: 90%;
  padding: 8px;
  margin: 35px auto 0px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${(props) => props.theme.colors.white};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray300};
  }
`;

const InputTitle = styled.div`
  position: absolute;
  color: #616161;
  margin: 8px 15px;
`;
const InsertInput = styled(Input)``;

const RemoveInput = styled(Input)``;

const Header = styled.div`
  display: flex;
  width: fit-content;
  font-size: 20px;
  font-weight: 700;
  font-weight: 700;

  margin: 12px 12px 7px 12px;
  gap: 10px;
  color: ${(props) => props.theme.colors.black};

  img {
    margin: 10px auto;
  }
`;
const Title = styled.div`
  line-height: 60px;
  font-size: 30px;
`;

const Divider = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;

  height: 1px;
  background: ${(props) => props.theme.colors.gray200};
`;

const Wrapper = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.gray200};
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.gray100};
  border-radius: 0 10px 10px 0;
  position: relative;
`;

const Body = styled.div<{ isAnimating: Boolean }>`
  opacity: ${(props) => props.isAnimating ? 0.5 : 1};
  transition: 0.2s all;
`;
const ResetButton = styled.button`
  all: unset;
  width: 90%;
  border-radius: 5px;
  margin: 10px auto;
  height: 45px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  transition: 0.2s all;
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.brightBlue};
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
`;
const ToggleAnimation = styled.div`
  display: flex;
  width: 90%;
  margin: 10px auto;
  gap: 8px;
`;
const AnimationCheckBox = styled.input`
  display: none;
  & + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: auto 0;
    border: 2px solid ${(props) => props.theme.colors.blue};
    border-radius: 3px;
    cursor: pointer;
    background: url("/check.svg");
  }
  &:checked + label {
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.gray300};
  }
`;
const ToggleDescription = styled.div<{ isAnimationActive: Boolean }>`
  color: ${(props) =>
    props.isAnimationActive
      ? props.theme.colors.black
      : props.theme.colors.gray400};
`;

const ExportButton = styled.button`
  all: unset;
  width: 90%;
  border-radius: 5px;
  margin: 10px auto 0px;
  height: 45px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  transition: 0.2s all;
  background: transparent;
  color: ${(props) => props.theme.colors.blue};
  border: 2px solid ${(props) => props.theme.colors.blue};
  cursor: pointer;
  &:hover {
    background: #64b5f647;
  }
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
      <Header>
        <Image src="/bst-mini.svg" alt="bst" width="40" height="40" />
        <Title>BST</Title>
      </Header>
      <Divider />
      {/* <Slider
        defaultValue={1}
        min={0.25}
        max={4}
        // getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      /> */}
      <Body isAnimating={isAnimating}>
        <Insert>
          <InputTitle>Insert</InputTitle>
          <InsertInput
            // placeholder="Value"
            onKeyPress={(e) => onInsertInputPress(e)}          
            disabled={isAnimating ? true : false}
          />
        </Insert>
        <Remove>
          <InputTitle>Remove</InputTitle>
          <RemoveInput
            disabled={isAnimating ? true : false}
            // placeholder="Value"
            onKeyPress={(e) => onRemoveInputPress(e)}
          />
        </Remove>
        <Divider />
        <ToggleAnimation>
          <AnimationCheckBox id="cb1" type="checkbox" 
          disabled={isAnimating ? true : false}/>
          <label
            htmlFor="cb1"
            onClick={() => {
              if(!isAnimating) setIsAnimationActive(!isAnimationActive);
            }}
          ></label>
          <ToggleDescription isAnimationActive={isAnimationActive}>
            Animation
          </ToggleDescription>
        </ToggleAnimation>
      </Body>

      <Footer>
        <Divider />
        <ExportButton onClick={() => setIsModalOpen(true)}>Export</ExportButton>
        <ResetButton onClick={() => reset()}>Reset</ResetButton>
      </Footer>
    </Wrapper>
  );
}
