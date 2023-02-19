import SortingBoard from "@/components/sorting/board/board";
import SortingController from "@/components/sorting/controller/controller";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: auto auto;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  width: 90%;
  height: 90vh;
  margin: auto auto;
  box-sizing: border-box;
`;


export default function Sorting() {
  return (
    <Wrapper>
      <Main>
        <SortingBoard></SortingBoard>
        <SortingController></SortingController>
      </Main>
      
    </Wrapper>
  )
}