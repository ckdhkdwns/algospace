import useModal from "@/utils/hooks/useModal";
import { Slider } from "@mui/material";
import { RefObject, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ isModalOpen: boolean }>`
    display: ${props => props.isModalOpen ? "block" : "none"};
    width: 400px;
    height: 80px;
    background: ${props => props.theme.colors.white};
    position: absolute;
    bottom: 60px;
    border: 1px solid #dadada;
    padding: 20px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.colors.green,
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      border: "2px solid",
      borderColor: theme.colors.green,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'normal',
      top: -6,
      backgroundColor: 'unset',
      color: theme.colors.green,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: '#fff',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));
  
type AnimationSpeedModalProps = {
  isModalOpen: boolean,
  setIsModalOpen: Function,
  buttonRef: RefObject<HTMLButtonElement>,
  animationSpeed: number;
  setAnimationSpeed: Function;
}

const marks = [
  {
    value: 1,
    label: "x0.25",
  },
  {
    value: 2,
    label: "x0.5",
  },
  {
    value: 3,
    label: "x1",
  },
  {
    value: 4,
    label: "x2",
  },
  {
      value: 5,
      label: "x4",
    },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function AnimationSpeedModal({
  isModalOpen,
  setIsModalOpen,
  buttonRef,
  animationSpeed,
  setAnimationSpeed
}: AnimationSpeedModalProps) {
  const modalRef = useModal(setIsModalOpen, buttonRef);
  const [speed, setSpeed] = useState<number>(1000);
  useEffect(() => {
    console.log(animationSpeed);
  }, [animationSpeed])

  const handleChange = (e:any, v:any) => {
    setAnimationSpeed(1000000 / ((2 ** v) * 125) || 1000);
  }
  return (
    <Wrapper ref={modalRef} isModalOpen={isModalOpen}>
      <IOSSlider
        defaultValue={3}
        value={Math.log2(8000/animationSpeed)}
        min={1}
        max={5}

        onChange={handleChange}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        track={false}
        
        marks={marks}
      />
    </Wrapper>
  );
}
