import React, { useState, useEffect, useRef } from "react";
import { TextArea } from "@carbon/react";
import MTHeader from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

const App = () => {
  const [activeKeys, setActiveKeys] = useState([]);
  const textareaRef = useRef();

  const handleKeyPress = (key, event, isKeyDown) => {
    textareaRef.current.focus();

    if (key === "Tab") {
      event.preventDefault();
      textareaRef.current.focus();
    }

    const normalizedKey =
      key === "Escape"
        ? "ESC"
        : key === " " || key === "Spacebar"
        ? "SPACE"
        : key === ":" || key === ";"
        ? ":"
        : key === "/" || key === "?"
        ? "/"
        : key === "+" || key === "="
        ? "+"
        : key === "<" || key === ","
        ? ","
        : key === ">" || key === "."
        ? "."
        : key === "{" || key === "["
        ? "["
        : key === "}" || key === "]"
        ? "]"
        : key === "|" || key === "\\"
        ? "\\"
        : key === "1" || key === "!"
        ? "1"
        : key === "2" || key === "@"
        ? "2"
        : key === "3" || key === "#"
        ? "3"
        : key === "4" || key === "$"
        ? "4"
        : key === "5" || key === "%"
        ? "5"
        : key === "6" || key === "^"
        ? "6"
        : key === "7" || key === "&"
        ? "7"
        : key === "8" || key === "*"
        ? "8"
        : key === "9" || key === "("
        ? "9"
        : key === "0" || key === ")"
        ? "0"
        : key === "Control"
        ? "CTRL"
        : key === "Alt"
        ? "ALT"
        : key === "Meta"
        ? "COMMAND"
        : key === "Tab"
        ? "TAB"
        : key === "Backspace"
        ? "BACKSPACE"
        : key === "Shift"
        ? "SHIFT"
        : key === "'" || key === '"'
        ? "'"
        : key.toUpperCase();

    setActiveKeys((prevKeys) => {
      if (isKeyDown) {
        if (!prevKeys.includes(normalizedKey)) {
          return [...prevKeys, normalizedKey];
        }
      } else {
        return prevKeys.filter((item) => item !== normalizedKey);
      }
      return prevKeys;
    });

    if (
      isKeyDown &&
      normalizedKey !== "SHIFT" &&
      normalizedKey !== "CTRL" &&
      normalizedKey !== "ALT" &&
      normalizedKey !== "COMMAND"
    ) {
      setTimeout(() => {
        setActiveKeys((prevKeys) =>
          prevKeys.filter((item) => item !== normalizedKey)
        );
      }, 100);
    }
  };

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <div className="container">
      <MTHeader />
      <div className="wrapper">
        <div className="textarea-wrapper">
          <TextArea
            ref={textareaRef}
            labelText="Text Area"
            helperText=""
            rows={4}
            id="text-area-1"
            onKeyDown={(e) => handleKeyPress(e.key, e, true)}
            onKeyUp={(e) => handleKeyPress(e.key, e, false)}
            tabIndex={0}
          />
        </div>
        <div className="keyboard-wrapper">
          <Keyboard handleKeyPress={handleKeyPress} activeKeys={activeKeys} />
        </div>
      </div>
    </div>
  );
};

export default App;
