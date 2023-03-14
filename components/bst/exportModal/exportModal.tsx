import { Ref, RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Dropdown from "@/components/public/dropdown";
import { TbFileExport } from "react-icons/tb";
import useModal from "@/utils/hooks/useModal";
import exportImage from "@/utils/bst/exportImage";

const Wrapper = styled.div<{ isModalOpen: boolean }>`
    display: ${props => props.isModalOpen ? "flex" : "none"};
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: #afafaf7c;
`

const Modal = styled.div`
    width: 400px;
    height: fit-content;
    margin: auto auto;
    gap: 8px;
    box-sizing: border-box;
    padding: 20px;
    background: ${props => props.theme.colors.white};
    border-radius: 10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
  display: flex;
  gap: 10px;
    font-size: 30px;
    margin: 0 0 8px 0;
    color: ${props => props.theme.colors.black};
    font-weight: 500;
    svg {
      margin: auto 0;
      stroke: ${props => props.theme.colors.blue};
    }
`

const Input = styled.input`
  all: unset;
  font-size: 16px;
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  margin: 0px auto 0px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
  box-sizing: border-box;
  border: 1px solid #CFCFCF;
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray300};
  }
`;
const InputTitle = styled.div`
  color: #616161;
  margin: 15px 4px 3px 3px;
`;
const FileNameInput = styled(Input)`
`
const FileName = styled.div``;
const FileExtension = styled.div``;
const ExportButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 10px;
  margin: 16px auto 0;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  transition: 0.2s all;
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.brightBlue};
  }
`;

type ExportModalProps = {
  isModalOpen: boolean,
  setIsModalOpen: Function,
  boardRef: RefObject<HTMLDivElement>,
};

export default function ExportModal({
  isModalOpen,
  setIsModalOpen,
  boardRef,
}: ExportModalProps) {
  const modalRef = useModal(setIsModalOpen, null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [selectedExtension, setSelectedExtension] = useState("PNG");

  const colors = {
    main: "#2E86C1",
    sub: "#5dade268"
  }
  
  return (
    <Wrapper isModalOpen={isModalOpen}>
      <Modal ref={modalRef}>
        <Title><TbFileExport/>Export</Title>
        <FileName>
          <InputTitle>Name</InputTitle>
          <FileNameInput ref={nameRef} placeholder="File Name"></FileNameInput>
        </FileName>
        <FileExtension>
          <InputTitle>Extension</InputTitle>
          <Dropdown
            colors={colors}
            selectedItem={selectedExtension}
            setSelectedItem={setSelectedExtension}
            items={["PNG", "JPEG", "SVG"]}
            direction="down"
          ></Dropdown>
        </FileExtension>
        <ExportButton onClick={() => exportImage(nameRef.current?.value, selectedExtension, boardRef)}>Export</ExportButton>
      </Modal>
    </Wrapper>
  );
}
