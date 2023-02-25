import { motion } from "framer-motion"
import styled from "styled-components"

const Wrapper = styled(motion.div)`
    
`

export default function Loading() {
    return (
        <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        >Loading</Wrapper>
    )
}