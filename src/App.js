import React, { useState, useEffect, useRef } from "react";
import { TextArea, ContentSwitcher, Switch } from "@carbon/react";
import MTHeader from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";

const App = () => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [language, setLanguage] = useState("malayalam");
  const [shiftPressed, setShiftPressed] = useState(false);
  const textareaRef = useRef();

  const englishLayout = {
    normal: [
      [
        { label: "`", key: "`", className: "layout-key", wide: true },
        { label: "1", key: "1", className: "layout-key", wide: false },
        { label: "2", key: "2", className: "layout-key", wide: false },
        { label: "3", key: "3", className: "layout-key", wide: false },
        { label: "4", key: "4", className: "layout-key", wide: false },
        { label: "5", key: "5", className: "layout-key", wide: false },
        { label: "6", key: "6", className: "layout-key", wide: false },
        { label: "7", key: "7", className: "layout-key", wide: false },
        { label: "8", key: "8", className: "layout-key", wide: false },
        { label: "9", key: "9", className: "layout-key", wide: false },
        { label: "0", key: "0", className: "layout-key", wide: false },
        { label: "-", key: "-", className: "layout-key", wide: false },
        { label: "=", key: "=", className: "layout-key", wide: false },
        { label: "BACKSPACE", key: "BACKSPACE", className: "back", wide: true }
      ],
      [
        { label: "TAB", key: "TAB", className: "tab", wide: true },
        { label: "Q", key: "Q", className: "layout-key", wide: false },
        { label: "W", key: "W", className: "layout-key", wide: false },
        { label: "E", key: "E", className: "layout-key", wide: false },
        { label: "R", key: "R", className: "layout-key", wide: false },
        { label: "T", key: "T", className: "layout-key", wide: false },
        { label: "Y", key: "Y", className: "layout-key", wide: false },
        { label: "U", key: "U", className: "layout-key", wide: false },
        { label: "I", key: "I", className: "layout-key", wide: false },
        { label: "O", key: "O", className: "layout-key", wide: false },
        { label: "P", key: "P", className: "layout-key", wide: false },
        { label: "[", key: "[", className: "layout-key", wide: false },
        { label: "]", key: "]", className: "layout-key", wide: false },
        { label: "\\", key: "\\", className: "layout-key", wide: false }
      ],
      [
        { label: "CAPS", key: "CAPS", className: "caps", wide: true },
        { label: "A", key: "A", className: "layout-key", wide: false },
        { label: "S", key: "S", className: "layout-key", wide: false },
        { label: "D", key: "D", className: "layout-key", wide: false },
        { label: "F", key: "F", className: "layout-key", wide: false },
        { label: "G", key: "G", className: "layout-key", wide: false },
        { label: "H", key: "H", className: "layout-key", wide: false },
        { label: "J", key: "J", className: "layout-key", wide: false },
        { label: "K", key: "K", className: "layout-key", wide: false },
        { label: "L", key: "L", className: "layout-key", wide: false },
        { label: ";", key: ":", className: "layout-key", wide: false },
        { label: "'", key: "'", className: "layout-key", wide: false },
        { label: "ENTER", key: "ENTER", className: "enter", wide: true }
      ],
      [
        { label: "SHIFT", key: "SHIFT", className: "shift-left", wide: true },
        { label: "Z", key: "Z", className: "layout-key", wide: false },
        { label: "X", key: "X", className: "layout-key", wide: false },
        { label: "C", key: "C", className: "layout-key", wide: false },
        { label: "V", key: "V", className: "layout-key", wide: false },
        { label: "B", key: "B", className: "layout-key", wide: false },
        { label: "N", key: "N", className: "layout-key", wide: false },
        { label: "M", key: "M", className: "layout-key", wide: false },
        { label: ",", key: ",", className: "layout-key", wide: false },
        { label: ".", key: ".", className: "layout-key", wide: false },
        { label: "/", key: "/", className: "layout-key", wide: false },
        {
          label: "SHIFT",
          key: "SHIFT",
          className: "shift-right",
          wide: true
        }
      ],
      [
        { label: "CTRL", key: "CTRL", className: "ctrl-left", wide: true },
        { label: "ALT", key: "ALT", className: "alt-left", wide: true },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-left",
          wide: true
        },
        {
          label: "SPACE",
          key: "SPACE",
          className: "space",
          wide: true,
          extraWide: true
        },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-right",
          wide: true
        },
        { label: "ALT", key: "ALT", className: "alt-right", wide: true },
        { label: "MENU", key: "MENU", className: "menu", wide: true },
        { label: "CTRL", key: "CTRL", className: "ctrl-right", wide: true }
      ]
    ],
    shifted: [
      [
        { label: "~", key: "~", className: "esc", wide: false },
        { label: "!", key: "!", className: "layout-key", wide: false },
        { label: "@", key: "@", className: "layout-key", wide: false },
        { label: "#", key: "#", className: "layout-key", wide: false },
        { label: "$", key: "$", className: "layout-key", wide: false },
        { label: "%", key: "%", className: "layout-key", wide: false },
        { label: "^", key: "^", className: "layout-key", wide: false },
        { label: "&", key: "&", className: "layout-key", wide: false },
        { label: "*", key: "*", className: "layout-key", wide: false },
        { label: "(", key: "(", className: "layout-key", wide: false },
        { label: ")", key: ")", className: "layout-key", wide: false },
        { label: "_", key: "_", className: "layout-key", wide: false },
        { label: "+", key: "+", className: "layout-key", wide: false },
        { label: "BACKSPACE", key: "BACKSPACE", className: "back", wide: true }
      ],
      [
        { label: "TAB", key: "TAB", className: "tab", wide: true },
        { label: "q", key: "Q", className: "layout-key", wide: false },
        { label: "w", key: "W", className: "layout-key", wide: false },
        { label: "e", key: "E", className: "layout-key", wide: false },
        { label: "r", key: "R", className: "layout-key", wide: false },
        { label: "t", key: "T", className: "layout-key", wide: false },
        { label: "y", key: "Y", className: "layout-key", wide: false },
        { label: "u", key: "U", className: "layout-key", wide: false },
        { label: "i", key: "I", className: "layout-key", wide: false },
        { label: "o", key: "O", className: "layout-key", wide: false },
        { label: "p", key: "P", className: "layout-key", wide: false },
        { label: "{", key: "[", className: "layout-key", wide: false },
        { label: "}", key: "]", className: "layout-key", wide: false },
        { label: "|", key: "\\", className: "layout-key", wide: false }
      ],
      [
        { label: "CAPS", key: "CAPS", className: "caps", wide: true },
        { label: "a", key: "A", className: "layout-key", wide: false },
        { label: "s", key: "S", className: "layout-key", wide: false },
        { label: "d", key: "D", className: "layout-key", wide: false },
        { label: "f", key: "F", className: "layout-key", wide: false },
        { label: "g", key: "G", className: "layout-key", wide: false },
        { label: "h", key: "H", className: "layout-key", wide: false },
        { label: "j", key: "J", className: "layout-key", wide: false },
        { label: "k", key: "K", className: "layout-key", wide: false },
        { label: "l", key: "L", className: "layout-key", wide: false },
        { label: ":", key: ":", className: "layout-key", wide: false },
        { label: "'", key: "'", className: "layout-key", wide: false },
        { label: "ENTER", key: "ENTER", className: "enter", wide: true }
      ],
      [
        { label: "SHIFT", key: "SHIFT", className: "shift-left", wide: true },
        { label: "z", key: "Z", className: "layout-key", wide: false },
        { label: "x", key: "X", className: "layout-key", wide: false },
        { label: "c", key: "C", className: "layout-key", wide: false },
        { label: "v", key: "V", className: "layout-key", wide: false },
        { label: "b", key: "B", className: "layout-key", wide: false },
        { label: "n", key: "N", className: "layout-key", wide: false },
        { label: "m", key: "M", className: "layout-key", wide: false },
        { label: "<", key: ">", className: "layout-key", wide: false },
        { label: ">", key: "<", className: "layout-key", wide: false },
        { label: "?", key: "/", className: "layout-key", wide: false },
        {
          label: "SHIFT",
          key: "SHIFT",
          className: "shift-right",
          wide: true
        }
      ],
      [
        { label: "CTRL", key: "CTRL", className: "ctrl-left", wide: true },
        { label: "ALT", key: "ALT", className: "alt-left", wide: true },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-left",
          wide: true
        },
        {
          label: "SPACE",
          key: "SPACE",
          className: "space",
          wide: true,
          extraWide: true
        },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-right",
          wide: true
        },
        { label: "ALT", key: "ALT", className: "alt-right", wide: true },
        { label: "MENU", key: "MENU", className: "menu", wide: true },
        { label: "CTRL", key: "CTRL", className: "ctrl-right", wide: true }
      ]
    ]
  };

  const malayalamLayout = {
    normal: [
      [
        {
          label: "ൊ",
          key: "ൊ",
          className: "layout-key",
          wide: false
        },
        { label: "൧", key: "൧", className: "layout-key", wide: false },
        { label: "൨", key: "൨", className: "layout-key", wide: false },
        { label: "൩", key: "൩", className: "layout-key", wide: false },
        { label: "൪", key: "൪", className: "layout-key", wide: false },
        { label: "൫", key: "൫", className: "layout-key", wide: false },
        { label: "൬", key: "൬", className: "layout-key", wide: false },
        { label: "൭", key: "൭", className: "layout-key", wide: false },
        { label: "൮", key: "൮", className: "layout-key", wide: false },
        { label: "൯", key: "൯", className: "layout-key", wide: false },
        { label: "൦", key: "൦", className: "layout-key", wide: false },
        { label: "-", key: "-", className: "layout-key", wide: false },
        { label: "ൃ", key: "ൃ", className: "layout-key", wide: false },
        {
          label: "BACKSPACE",
          key: "BACKSPACE",
          className: "back",
          wide: true
        }
      ],
      [
        { label: "TAB", key: "TAB", className: "tab", wide: true },
        { label: "ൗ", key: "ൗ", className: "layout-key", wide: false },
        { label: "ൈ", key: "ൈ", className: "layout-key", wide: false },
        { label: "ാ", key: "ാ", className: "layout-key", wide: false },
        { label: "ീ", key: "ീ", className: "layout-key", wide: false },
        { label: "ൂ", key: "ൂ", className: "layout-key", wide: false },
        { label: "ബ", key: "ബ", className: "layout-key", wide: false },
        { label: "ഹ", key: "ഹ", className: "layout-key", wide: false },
        { label: "ഗ", key: "ഗ", className: "layout-key", wide: false },
        { label: "ദ", key: "ദ", className: "layout-key", wide: false },
        { label: "ജ", key: "ജ", className: "layout-key", wide: false },
        { label: "ഡ", key: "ഡ", className: "layout-key", wide: false },
        { label: "∎", key: "∎", className: "layout-key", wide: false },
        { label: "ർ", key: "ർ", className: "layout-key", wide: false }
      ],
      [
        { label: "CAPS", key: "CAPS", className: "caps", wide: true },
        { label: "ോ", key: "ോ", className: "layout-key", wide: false },
        { label: "േ", key: "േ", className: "layout-key", wide: false },
        { label: "്", key: "്", className: "layout-key", wide: false },
        { label: "ി", key: "ി", className: "layout-key", wide: false },
        { label: "ു", key: "ു", className: "layout-key", wide: false },
        { label: "പ", key: "പ", className: "layout-key", wide: false },
        { label: "ര", key: "ര", className: "layout-key", wide: false },
        { label: "ക", key: "ക", className: "layout-key", wide: false },
        { label: "ത", key: "ത", className: "layout-key", wide: false },
        { label: "ച", key: "ച", className: "layout-key", wide: false },
        { label: "ട", key: "ട", className: "layout-key", wide: false },
        { label: "ENTER", key: "ENTER", className: "enter", wide: true }
      ],
      [
        { label: "SHIFT", key: "SHIFT", className: "shift-left", wide: true },
        { label: "െ", key: "െ", className: "layout-key", wide: false },
        { label: "ം", key: "ം", className: "layout-key", wide: false },
        { label: "മ", key: "മ", className: "layout-key", wide: false },
        { label: "ന", key: "ന", className: "layout-key", wide: false },
        { label: "വ", key: "വ", className: "layout-key", wide: false },
        { label: "ല", key: "ല", className: "layout-key", wide: false },
        { label: "സ", key: "സ", className: "layout-key", wide: false },
        { label: ",", key: ",", className: "layout-key", wide: false },
        { label: ".", key: ".", className: "layout-key", wide: false },
        { label: "യ", key: "യ", className: "layout-key", wide: false },
        {
          label: "SHIFT",
          key: "SHIFT",
          className: "shift-right",
          wide: true
        }
      ],
      [
        { label: "CTRL", key: "CTRL", className: "ctrl-left", wide: true },
        { label: "ALT", key: "ALT", className: "alt-left", wide: true },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-left",
          wide: true
        },
        {
          label: "SPACE",
          key: "SPACE",
          className: "space",
          wide: true,
          extraWide: true
        },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-right",
          wide: true
        },
        { label: "ALT", key: "ALT", className: "alt-right", wide: true },
        { label: "MENU", key: "MENU", className: "menu", wide: true },
        { label: "CTRL", key: "CTRL", className: "ctrl-right", wide: true }
      ]
    ],

    shifted: [
      [
        { label: "ഒ", key: "ഒ", className: "layout-key", wide: false },
        { label: "1", key: "1", className: "layout-key", wide: false },
        { label: "2", key: "2", className: "layout-key", wide: false },
        { label: "3", key: "3", className: "layout-key", wide: false },
        { label: "4", key: "4", className: "layout-key", wide: false },
        { label: "5", key: "5", className: "layout-key", wide: false },
        { label: "6", key: "6", className: "layout-key", wide: false },
        { label: "7", key: "7", className: "layout-key", wide: false },
        { label: "8", key: "8", className: "layout-key", wide: false },
        { label: "9", key: "9", className: "layout-key", wide: false },
        { label: "0", key: "0", className: "layout-key", wide: false },
        { label: "ഃ", key: "ഃ", className: "layout-key", wide: false },
        { label: "ഋ", key: "ഋ", className: "layout-key", wide: false },
        { label: "BACKSPACE", key: "BACKSPACE", className: "back", wide: true }
      ],
      [
        { label: "TAB", key: "TAB", className: "tab", wide: true },
        { label: "ഔ", key: "ഔ", className: "layout-key", wide: false },
        { label: "ഐ", key: "ഐ", className: "layout-key", wide: false },
        { label: "ആ", key: "ആ", className: "layout-key", wide: false },
        { label: "ഈ", key: "ഈ", className: "layout-key", wide: false },
        { label: "ഊ", key: "ഊ", className: "layout-key", wide: false },
        { label: "ഭ", key: "ഭ", className: "layout-key", wide: false },
        { label: "ങ", key: "ങ", className: "layout-key", wide: false },
        { label: "ഘ", key: "ഘ", className: "layout-key", wide: false },
        { label: "ധ", key: "ധ", className: "layout-key", wide: false },
        { label: "ഝ", key: "ഝ", className: "layout-key", wide: false },
        { label: "ഢ", key: "ഢ", className: "layout-key", wide: false },
        { label: "ഞ", key: "ഞ", className: "layout-key", wide: false },
        { label: "|", key: "|", className: "layout-key", wide: false }
      ],
      [
        { label: "CAPS", key: "CAPS", className: "caps", wide: true },
        { label: "ഓ", key: "ഓ", className: "layout-key", wide: false },
        { label: "ഏ", key: "ഏ", className: "layout-key", wide: false },
        { label: "അ", key: "അ", className: "layout-key", wide: false },
        { label: "ഇ", key: "ഇ", className: "layout-key", wide: false },
        { label: "ഉ", key: "ഉ", className: "layout-key", wide: false },
        { label: "ഫ", key: "ഫ", className: "layout-key", wide: false },
        { label: "റ", key: "റ", className: "layout-key", wide: false },
        { label: "ഖ", key: "ഖ", className: "layout-key", wide: false },
        { label: "ഥ", key: "ഥ", className: "layout-key", wide: false },
        { label: "ഛ", key: "ഛ", className: "layout-key", wide: false },
        { label: "ഠ", key: "ഠ", className: "layout-key", wide: false },
        { label: "ENTER", key: "ENTER", className: "enter", wide: true }
      ],
      [
        { label: "SHIFT", key: "SHIFT", className: "shift-left", wide: true },
        { label: "എ", key: "എ", className: "layout-key", wide: false },
        { label: "‍", key: "X", className: "layout-key", wide: false },
        { label: "ണ", key: "ണ", className: "layout-key", wide: false },
        { label: "‌", key: "V", className: "layout-key", wide: false },
        { label: "ഴ", key: "ഴ", className: "layout-key", wide: false },
        { label: "ള", key: "ള", className: "layout-key", wide: false },
        { label: "ശ", key: "ശ", className: "layout-key", wide: false },
        { label: "ഷ", key: "ഷ", className: "layout-key", wide: false },
        { label: ".", key: ".", className: "layout-key", wide: false },
        { label: "/", key: "/", className: "layout-key", wide: false },
        {
          label: "SHIFT",
          key: "SHIFT",
          className: "shift-right",
          wide: true
        }
      ],
      [
        { label: "CTRL", key: "CTRL", className: "ctrl-left", wide: true },
        { label: "ALT", key: "ALT", className: "alt-left", wide: true },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-left",
          wide: true
        },
        {
          label: "SPACE",
          key: "SPACE",
          className: "space",
          wide: true,
          extraWide: true
        },
        {
          label: "COMMAND",
          key: "COMMAND",
          className: "command-right",
          wide: true
        },
        { label: "ALT", key: "ALT", className: "alt-right", wide: true },
        { label: "MENU", key: "MENU", className: "menu", wide: true },
        { label: "CTRL", key: "CTRL", className: "ctrl-right", wide: true }
      ]
    ]
  };

  const createMalayalamKeyMap = (layout) => {
    const keyMap = {};

    layout.normal.forEach((row) => {
      row.forEach((keyObj) => {
        if (keyObj.key.length === 1) {
          keyMap[keyObj.key.toLowerCase()] = keyObj.label;
        } else if (keyObj.key === "DEAD") {
          keyMap[keyObj.key] = null;
        }
      });
    });

    layout.shifted.forEach((row) => {
      row.forEach((keyObj) => {
        if (keyObj.key.length === 1) {
          keyMap[keyObj.key.toUpperCase()] = keyObj.label;
        }
      });
    });

    return keyMap;
  };

  const malayalamKeyMap = createMalayalamKeyMap(malayalamLayout);

  const handleKeyPress = (key, event, isKeyDown) => {
    textareaRef.current.focus();

    if (key === "DEAD") {
      return;
    }

    if (key === "Shift") setShiftPressed(isKeyDown);
    if (key === "Tab") {
      event.preventDefault();
      textareaRef.current.focus();
    }
    const normalizedKey =
      key === "Escape"
        ? "ESC"
        : key === " "
        ? "SPACE"
        : key === "Spacebar"
        ? "SPACE"
        : key === ":"
        ? ":"
        : key === ";"
        ? ";"
        : key === "/"
        ? "/"
        : key === "?"
        ? "?"
        : key === "+"
        ? "+"
        : key === "="
        ? "="
        : key === "<"
        ? "<"
        : key === ","
        ? ","
        : key === ">"
        ? ">"
        : key === "."
        ? "."
        : key === "~"
        ? "~"
        : key === "`"
        ? "`"
        : key === "{"
        ? "{"
        : key === "["
        ? "["
        : key === "}"
        ? "}"
        : key === "]"
        ? "]"
        : key === "\\"
        ? "\\"
        : key === "|"
        ? "|"
        : key === "1"
        ? "1"
        : key === "!"
        ? "1"
        : key === "2"
        ? "2"
        : key === "@"
        ? "2"
        : key === "3"
        ? "3"
        : key === "#"
        ? "3"
        : key === "4"
        ? "4"
        : key === "$"
        ? "4"
        : key === "5"
        ? "5"
        : key === "%"
        ? "5"
        : key === "6"
        ? "6"
        : key === "^"
        ? "6"
        : key === "7"
        ? "7"
        : key === "&"
        ? "7"
        : key === "8"
        ? "8"
        : key === "*"
        ? "8"
        : key === "9"
        ? "9"
        : key === "("
        ? "9"
        : key === "0"
        ? "0"
        : key === ")"
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
        : key === "'"
        ? "'"
        : key === '"'
        ? "'"
        : language === "malayalam"
        ? malayalamKeyMap[key] || key.toUpperCase()
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
      !["SHIFT", "CTRL", "ALT", "COMMAND"].includes(normalizedKey)
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

  useEffect(() => {
    console.log(activeKeys, "Active keys");
  }, [activeKeys]);

  return (
    <div className="container">
      <MTHeader />
      <div className="wrapper">
        <div className="switcher-wrapper">
          <ContentSwitcher
            onChange={(e) => {
              setLanguage(e.name);
              setShiftPressed(false);
              setActiveKeys([]);
              if (textareaRef.current) {
                textareaRef.current.value = "";
                textareaRef.current.focus();
              }
            }}
            size="sm"
            selectedIndex={0}
            selectionMode="automatic"
          >
            <Switch
              name="malayalam"
              text="Malayalam"
              aria-label="Switch to Malayalam"
              selected={language === "malayalam"}
            />
            <Switch
              name="english"
              text="English"
              aria-label="Switch to English"
              selected={language === "english"}
            />
          </ContentSwitcher>
        </div>

        <div className="textarea-wrapper">
          <TextArea
            ref={textareaRef}
            labelText=""
            rows={4}
            id="text-area-1"
            onKeyDown={(e) => handleKeyPress(e.key, e, true)}
            onKeyUp={(e) => handleKeyPress(e.key, e, false)}
          />
        </div>

        <div className="keyboard-wrapper">
          <Keyboard
            handleKeyPress={handleKeyPress}
            activeKeys={activeKeys}
            shiftPressed={shiftPressed}
            layout={language === "english" ? englishLayout : malayalamLayout}
            malayalamKeyMap={malayalamKeyMap}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
