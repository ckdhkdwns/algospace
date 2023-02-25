import styled from "styled-components";
import Image from "next/image";
import Dropdown from "@/components/public/dropdown";
import { useState } from "react";
import useInput from "@/utils/hooks/useInput";

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


const ResetButton = styled.button`
  all: unset;
  width: 90%;
  border-radius: 10px;
  margin: 10px auto;
  height: 45px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  transition: 0.2s all;
  background: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.brightGreen};
  }
`;

const Divider = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  
  height: 1px;
  background: ${(props) => props.theme.colors.gray200};
`;
const Body = styled.div<{ isAnimating: Boolean }>`
  opacity: ${(props) => props.isAnimating ? 0.5 : 1};
  transition: 0.2s all;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InsertValue = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  all: unset;
  font-size: 18px;
  width: 100%;
  padding: 8px;
  margin: 0px auto 0px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.green};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray300};
  }
`;

const InsertInput = styled(Input)``;

const SelectType = styled.div`
  display: flex;
  flex-direction: column;
`
const Description = styled.div`
  color: #616161;
  margin: 0 0 5px 5px;
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
`;

type SortingControllerProps = {
  addValue: Function,
}
export default function SortingController({ addValue }:SortingControllerProps) {
  const [selectedItem, setSelectedItem] = useState("Selection");
  const onInsertPress = useInput(addValue);
  const items = ["Selection", "Insertion", "Bubble", "Merge", "Heap"]
  const colors = {
    main: "#17A589",
    sub: "#48C9B01f"
  }
  return (
    <Wrapper>
      <Header>
        <Image src="/sorting-mini.svg" alt="bst" width="35" height="35" style={{marginTop: "10px"}}/>
        <Title>Sorting</Title>
      </Header>
      <Divider />
      <Body isAnimating={false}> {/* 임시 */}
        <InsertValue>
          <Description>Insert</Description>
          <InsertInput onKeyPress={onInsertPress}/>
        </InsertValue>
        <SelectType>
          <Description>Type</Description>
          <Dropdown colors={colors} selectedItem={selectedItem} setSelectedItem={setSelectedItem} items={items}/>
        </SelectType>
        
      </Body>
      <Divider />
      <Footer>
        <ResetButton>Reset</ResetButton>
      </Footer>
      
    </Wrapper>
  );
}
