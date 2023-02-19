import styled from "styled-components";

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
  background: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.brightBlue};
  }
`;

export default function SortingController() {
    return (
        <Wrapper>
          <ResetButton>Reset</ResetButton>
        </Wrapper>
    );
}