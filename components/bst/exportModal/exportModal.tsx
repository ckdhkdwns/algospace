import { Ref, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FileExtensionDropdown from "./fileExtensionDropdown";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const Wrapper = styled.div<{ isModalOpen: boolean }>`
    display: ${props => props.isModalOpen ? "flex" : "none"};
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: #afafaf4c;
`

const Modal = styled.div`
    width: 400px;
    height: fit-content;
    margin: auto auto;
    box-sizing: border-box;
    padding: 15px;
    background: ${props => props.theme.colors.white};
    border-radius: 10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`
const Title = styled.div`
    font-size: 30px;
    margin: 0 0 8px 3px;
    color: ${props => props.theme.colors.black};
    font-weight: 500;
`

const Input = styled.input`
  all: unset;
  font-size: 18px;
  width: 100%;
  padding: 8px 12px;
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
  margin: 8px 3px;
`;
const FileNameInput = styled(Input)`
`
const FileExtensionInput = styled(Input)`
`
const FileName = styled.div``;
const FileExtension = styled.div``;
const ExportButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 5px;
  margin: 16px auto 0;
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


type ExportModalProps = {
  isModalOpen: boolean,
  setIsModalOpen: Function,
  boardRef: Ref<HTMLDivElement>,
  onExport: Function
};

export default function ExportModal({
  isModalOpen,
  setIsModalOpen,
  boardRef,
  onExport
}: ExportModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const extensionRef = useRef<HTMLInputElement | null>(null);

  const [selectedExtension, setSelectedExtension] = useState("PNG");
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e:any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef?.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', (e) => handler(e));
    // document.addEventListener('touchstart', handler); // 모바일 대응
    //f
  }, []);


  const onClickExport = () => {
    onExport(nameRef.current?.value, selectedExtension);
  }
  return (
    <Wrapper isModalOpen={isModalOpen}>
      <Modal ref={modalRef}>
        <Title>Export</Title>
        <FileName>
          <InputTitle>Name</InputTitle>
          <FileNameInput ref={nameRef} placeholder="File Name"></FileNameInput>
        </FileName>
        <FileExtension>
          <InputTitle>Extension</InputTitle>
          <FileExtensionDropdown
            selectedExtension={selectedExtension}
            setSelectedExtension={setSelectedExtension}
          ></FileExtensionDropdown>
        </FileExtension>
        <ExportButton onClick={() => onClickExport()}>Export</ExportButton>
      </Modal>
    </Wrapper>
  );
}
