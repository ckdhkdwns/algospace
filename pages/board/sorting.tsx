import SortingBoard from "@/components/sorting/board/board";
import SortingController from "@/components/sorting/controller/controller";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
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
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  width: 90%;
  height: 90vh;
  margin: auto auto;
  box-sizing: border-box;
`;


export default function Sorting() {
  const [ values, setValues ] = useState<number[]>([]);

  const reset = () => {
    setValues([]);
  }
  return (
    <Wrapper
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}>
      <Main>
        <SortingBoard values={values}></SortingBoard>
        <SortingController
          addValue={(n:number) => setValues([...values, n])}
          reset={reset}
        ></SortingController>
      </Main>
      
    </Wrapper>
  )
}