import styled from "styled-components";
import Image from "next/image";
import Dropdown from "@/components/public/dropdown";
import { useState } from "react";
import useInput from "@/utils/hooks/useInput";
import { CgRedo } from "react-icons/cg";
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
  border: 1px solid #dadada;
`;

const Button = styled.button`
  all: unset;
  width: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 40px;
  background: #aae1d6;
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
    fill: ${(props) => props.theme.colors.green};
  }
  &:hover {
    background: ${(props) => props.theme.colors.green};
    path {
      fill: #efefef;
    }
  }
`;

const Input = styled.input`
  all: unset;
  font-size: 18px;
  margin: auto 0;
  width: 150px;
  height: 40px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #cfcfcf;
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.green};
  }
  &::placeholder {
    color: #7d7d7d;
    font-size: 16px;
  }
`;

const SortButton = styled(Button)`
  svg {
    width: 65%;
    height: 65%;
  }
  path {
    fill: ${(props) => props.theme.colors.green};
  }
  &:hover {
    background: ${(props) => props.theme.colors.green};;
    path {
      fill: #efefef;
    }
  }
`;

const InsertInput = styled(Input)``;

const SelectType = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;
const Form = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
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

type SortingControllerProps = {
  addValue: Function;
  reset: Function;
  testSorting: Function;
};
export default function SortingController({
  addValue,
  reset,
  testSorting,
}: SortingControllerProps) {
  const [selectedItem, setSelectedItem] = useState("Selection");
  const onInsertPress = useInput(addValue);
  const items = ["Selection", "Insertion", "Bubble", "Merge", "Heap"];
  const colors = {
    main: "#17A589",
    sub: "#48C9B01f",
  };

  return (
    <Wrapper>
      <Form>
        <InsertInput placeholder="Insert" onKeyPress={onInsertPress} />
        <SelectType>
          <Dropdown
            colors={colors}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            items={items}
            direction="up"
          />
        </SelectType>
      </Form>
      <Divider />
      <More>
        <SortButton onClick={() => testSorting()}>
          <IoPlay />
        </SortButton>
        <ResetButton onClick={() => reset()}>
          
          <CgRedo />
        </ResetButton>
      </More>
    </Wrapper>
  );
}
