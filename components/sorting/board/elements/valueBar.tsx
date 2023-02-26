import { motion } from "framer-motion"
import styled from "styled-components"


const Wrapper = styled.g``
const Bar = styled(motion.rect) <{ width: number }> `
  fill: ${props => props.theme.colors.gray300};
  width: ${props => props.width + "px"};
`

const Text = styled(motion.text)`
    transform: scaleY(-1);
    text-anchor: middle;
`

type ValueBarProps = {
    x: number;
    width: number;
    height: number;
    value: number;
}

export default function ValueBar({ x, width, height, value }: ValueBarProps) {
    return <Wrapper>
        <Bar
            x={x}
            y={35}
            initial={{ height: 0 }}
            transition={{ height: { duration: 0.4, delay: 0.2 } }}
            animate={{ height: height*9/10 + "%" }}
            width={width}
        ></Bar>
        <Text x={x + width / 2} y={-10}>{value}</Text>
    </Wrapper>
}