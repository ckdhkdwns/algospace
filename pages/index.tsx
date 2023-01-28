  import Head from 'next/head'
  import { Inter } from '@next/font/google'
  import styles from '@/styles/Home.module.css'
  import styled from "styled-components";
  import Router from "next/router";
  import Image from 'next/image'

  const inter = Inter({ subsets: ['latin'] })

  const Wrapper = styled.div`
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 80%;
  `;
  const Header = styled.div`
  `
  const Title = styled.div`
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 60px;
  `
  const Subtitle = styled.div`
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    color: #6f6f6f;
  `
  const Body = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 30px;
  `
  const BSTBtn = styled.button`
    all: unset;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 300px;
    justify-content: space-between;
    height: 300px;
    background: #E6DFF1;
    border-radius: 20px;
    padding: 28px 38px 38px 38px;
    box-sizing: border-box;
    &:hover{  
      background: #E6DFF1af;
    }
    & img {
      margin: 0px auto;
      
    }
  `
  const AVLBtn = styled.button`
    all: unset;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 300px;
    justify-content: space-between;
    height: 300px;
    background: #F1DFDE;
    border-radius: 20px;
    padding: 38px;
    box-sizing: border-box;
    &:hover{  
      background: #F1DFDEaf;
    }
    & img {
      margin: 0px auto;
      
    }
  `

  const BtnTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    
  `

  const BtnSubtitle = styled.div`
    margin-top: 5px;
    text-align: left;
    font-size: 13px;
    color: #282828;
  `

  const TitleWrapper = styled.div``

  export default function Home() {
    return (
      <Wrapper>
        <Header>
          <Title>DSAV</Title>
          <Subtitle>Visualize various data structures and algorithms.</Subtitle>
        </Header>
        <Body>
          
          <BSTBtn onClick={() => { Router.push("/board/binary-search-tree") }}>
            <Image src="/bst.svg" alt="bst" width="170" height="170" />
            <TitleWrapper>
              <BtnTitle>Binary Search Tree</BtnTitle>
              <BtnSubtitle>Insert and Delete nodes in BST</BtnSubtitle>
            </TitleWrapper>
            
          </BSTBtn>
          <AVLBtn onClick={() => { Router.push("/board/avl-tree") }}>
            <Image src="/sorting.svg" alt="bst" width="174" height="174"/>
            <TitleWrapper>
              <BtnTitle>Sorting</BtnTitle>
              <BtnSubtitle>Sort various values</BtnSubtitle>
            </TitleWrapper>
          </AVLBtn>
        </Body>
      </Wrapper>
    )
  }

