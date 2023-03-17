import { useState } from "react";

const useInput = (callback: Function) => {
  const onKeyPress = (e: any) => {
    if (e.key == "Enter") {
      if (!isNaN(e.target.value)) {
        callback((e.target.value *= 1));
        e.target.value = "";
      }
    }
  };
  return onKeyPress;
};

export default useInput;
