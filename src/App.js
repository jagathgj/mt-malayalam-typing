import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextArea } from "@carbon/react";
import MTHeader from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

const App = () => {
  const [typedLetters, setTypedLetters] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const cursorPosition = useRef(typedLetters.length);
  const handleKeyPress = useCallback(
    (label) => {
      setTypedLetters((prev) => prev + label);
      cursorPosition.current = typedLetters.length + 1;
    },
    [typedLetters]
  );

  const handleSelectAll = useCallback(() => {
    setSelectedText(typedLetters);
  }, [typedLetters]);

  const handleCopy = useCallback(() => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
    } else {
      navigator.clipboard.writeText(typedLetters);
    }
  }, [selectedText, typedLetters]);

  const handlePaste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    setTypedLetters((prev) => prev + text);
  }, []);

  const handleCut = useCallback(() => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      setTypedLetters((prev) => prev.replace(selectedText, ""));
    }
  }, [selectedText]);

  useEffect(() => {
    const handleKeyboardEvent = (event) => {
      const key = event.key;

      if (
        ["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(key)
      ) {
        return;
      }

      if (key === "Enter") {
        setTypedLetters((prev) => prev + "\n");
      } else if (key === "Backspace") {
        setTypedLetters((prev) => prev.slice(0, -1));
      } else if (key === "ArrowUp") {
        setTypedLetters((prev) => prev + "[UP ARROW]");
      } else if (key === "ArrowDown") {
        setTypedLetters((prev) => prev + "[DOWN ARROW]");
      } else if (key === "ArrowLeft") {
        setTypedLetters((prev) => prev + "[LEFT ARROW]");
      } else if (key === "ArrowRight") {
        setTypedLetters((prev) => prev + "[RIGHT ARROW]");
      } else if (isCtrlPressed && key === "c") {
        event.preventDefault();
        handleCopy();
      } else if (isCtrlPressed && key === "v") {
        event.preventDefault();
        handlePaste();
      } else if (isCtrlPressed && key === "x") {
        event.preventDefault();
        handleCut();
      } else if (isCtrlPressed && key === "a") {
        event.preventDefault();
        handleSelectAll();
      } else {
        const typedKey = isShiftPressed ? key.toUpperCase() : key.toLowerCase();
        setTypedLetters((prev) => prev + typedKey);
      }
    };

    const handleCtrlKeyDown = (event) => {
      if (event.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleCtrlKeyUp = (event) => {
      if (event.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    const handleShiftKeyDown = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleShiftKeyUp = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyboardEvent);
    window.addEventListener("keydown", handleCtrlKeyDown);
    window.addEventListener("keyup", handleCtrlKeyUp);
    window.addEventListener("keydown", handleShiftKeyDown);
    window.addEventListener("keyup", handleShiftKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
      window.removeEventListener("keydown", handleCtrlKeyDown);
      window.removeEventListener("keyup", handleCtrlKeyUp);
      window.removeEventListener("keydown", handleShiftKeyDown);
      window.removeEventListener("keyup", handleShiftKeyUp);
    };
  }, [
    handleCopy,
    handleCut,
    handleSelectAll,
    isCtrlPressed,
    isShiftPressed,
    handlePaste
  ]);

  return (
    <div className="container">
      <MTHeader />
      <div className="wrapper">
        <div className="textarea-wrapper">
          <TextArea
            labelText="Text Area label"
            helperText="Optional helper text"
            rows={4}
            id="text-area-1"
            counterMode="word"
            value={typedLetters}
          />
        </div>
        <div className="keyboard-wrapper">
          <Keyboard handleKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
};

export default App;
