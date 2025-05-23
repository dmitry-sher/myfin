import { useEffect, useState } from "react";

export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);
  function downHandler({ key, altKey, metaKey, ctrlKey }: KeyboardEvent): void {
    if (altKey || metaKey || ctrlKey) {
      return;
    }
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  const upHandler = ({
    key,
    altKey,
    metaKey,
    ctrlKey,
  }: KeyboardEvent): void => {
    if (altKey || metaKey || ctrlKey) {
      return;
    }
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return keyPressed;
};
