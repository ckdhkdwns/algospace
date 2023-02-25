import styled from "styled-components";
import BSTMenu from "./menu";
import BSTTitle from "./title";


const Wrapper = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
`

type BSTHeaderProps = {
    onInsertInputPress: Function;
    onRemoveInputPress: Function;
    reset: Function;
    isAnimationActive: Boolean;
    setIsAnimationActive: Function;
    isAnimating: Boolean;
    setIsModalOpen: Function;
  };

  
export default function BSTHeader(props:BSTHeaderProps) {
    return(
        <Wrapper>
            <BSTTitle />
            <BSTMenu {...props}/>
        </Wrapper>
    )
}