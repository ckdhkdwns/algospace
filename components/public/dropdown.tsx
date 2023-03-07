import { Ref, useState } from "react";
import { motion, MotionProps, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

type Colors = {
  main: string;
  sub: string;
}
const Wrapper = styled(motion.div)``;
const DropdownButton = styled.button<{ colors: Colors, isOpen: Boolean }>`
  all: unset;
  position: relative;
  font-size: 16px;
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  margin: 0px auto 0px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
  box-sizing: border-box;
  border: 1px solid #cfcfcf;
  cursor: pointer;
  color: ${(props) => props.theme.colors.black};
  &:focus {
    outline: 1px solid ${(props) => props.colors.main};
  }
  &:focus svg {
    fill: ${(props) => props.colors.main};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray300};
  }
  svg {
    position: absolute;
    width: 25px;
    height: 25px;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    fill: ${(props) => props.theme.colors.gray400};
    transform-origin: 50% 25%;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : null)};
  }
`;

const ItemsWrapper = styled(motion.div)`
  position: relative;
`;
const Items = styled.div<{ direction: string }>`
  width: 100%;
  position: absolute;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  top: ${props => props.direction == "up" ? "auto" : "5px"};
  bottom: ${props => props.direction == "up" ? "45px" : "auto"};
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  box-sizing: border-box;
`;
const Item = styled.div<{colors: Colors}>`
  position: relative;
  font-size: 18px;
  width: 100%;
  padding: 8px;
  background: ${(props) => props.theme.colors.white};
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray400};
  &:hover {
    background: ${(props) => props.colors.sub};
    color: ${(props) => props.colors.main};
  }
`;


type DropdownProps = {
  selectedItem: string;
  setSelectedItem: Function;
  items: string[];
  colors: Colors,
  direction: string;
};
export default function Dropdown({
  selectedItem,
  setSelectedItem,
  items,
  colors,
  direction
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.2,
        delay: 0,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <Wrapper>
      <DropdownButton
        onBlur={() => setIsOpen(false)}
        onMouseDown={toggleMenu}
        isOpen={isOpen}
        colors={colors}
      >
        {selectedItem}
        <MdKeyboardArrowDown />
      </DropdownButton>
      <ItemsWrapper
        className="sub-menu"
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
      >
        <Items direction={direction}>
          {items.map((item, idx) => (
            <Item colors={colors} onClick={() => setSelectedItem(item)}>
              {item}
            </Item>
          ))}
        </Items>
      </ItemsWrapper>
    </Wrapper>
  );
}
