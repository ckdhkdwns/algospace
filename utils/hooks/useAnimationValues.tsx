import { RefObject, useEffect, useState } from "react";


type AnimationValuesProps = [number, number, string];

const useAnimationValues = ( isAnimationActive:boolean ):AnimationValuesProps => {
    const [delay, setDelay] = useState(1);
    const [duration, setDuration] = useState(0.5);
    const [strokeColor, setStrokeColor] = useState("#FF5733");

    useEffect(() => {
        if (isAnimationActive) {
          setDelay(1);
          setDuration(0.5);
          setStrokeColor("#FF5733");
        } else {
          setDelay(0);
          setDuration(0);
          setStrokeColor("#000000");
        }
      }, [isAnimationActive]);

    return [delay, duration, strokeColor]
}

export default useAnimationValues;