import { useEffect, useState } from "react";

const useKeyPress = function (targetKey: string, preventDef = false) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function downHandler(e: KeyboardEvent) {
      if (e.key === targetKey) {
        if (preventDef) {
          e.preventDefault();
        }

        setKeyPressed(true);
      }
    }

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default useKeyPress