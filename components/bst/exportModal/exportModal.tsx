import { Ref, RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Dropdown from "@/components/public/dropdown";
import { TbFileExport } from "react-icons/tb";

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
    box-sizing: border-box;
    padding: 16px;
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


type Colors = {
  main: string;
  sub: string;
}

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [selectedExtension, setSelectedExtension] = useState("PNG");

  const colors = {
    main: "#2E86C1",
    sub: "#5dade268"
  }
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

  const exportImage = (name: string | undefined , extension: string) => {
    if(typeof name == undefined) return;
    if(!boardRef) return; 
    const img = boardRef.current?.childNodes[0];
    
    console.log(img);
    if (!img) return;
    function filter(node: any) {
      return node.tagName !== "i";
    }

    if (extension == "SVG") {
      domtoimage.toSvg(img, { filter: filter }).then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `${name}.svg`;
        link.href = dataUrl;
        link.click();
      });
    }
    if (extension == "PNG") {
      domtoimage.toBlob(img).then(function (blob) {
        saveAs(blob, `${name}.png`);
      });
    }
    if (extension == "JPEG") {
      domtoimage.toJpeg(img, { quality: 1 }).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${name}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
    }
  };
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
        <ExportButton onClick={() => exportImage(nameRef.current?.value, selectedExtension)}>Export</ExportButton>
      </Modal>
    </Wrapper>
  );
}
