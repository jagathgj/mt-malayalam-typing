import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextArea, ContentSwitcher, Switch } from "@carbon/react";
import MTHeader from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import layout from "./layout.json";

const App = () => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [language, setLanguage] = useState("malayalam");
  const [shiftPressed, setShiftPressed] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const textareaRef = useRef();

  const englishLayout = layout.englishLayout;
  const malayalamLayout = layout.malayalamLayout;

  const createMalayalamKeyMap = (layout) => {
    const keyMap = {};
    layout.normal.forEach((row) => {
      row.forEach((keyObj) => {
        keyMap[keyObj.code] = keyObj.label;
      });
    });
    layout.shifted.forEach((row) => {
      row.forEach((keyObj) => {
        keyMap[keyObj.code] = keyObj.label;
      });
    });
    return keyMap;
  };

  const malayalamKeyMap = createMalayalamKeyMap(malayalamLayout);

  const updateCapsLockState = (e) => {
    if (e && e.getModifierState) {
      const isCapsLockActive = e.getModifierState("CapsLock");
      setCapsLockActive(isCapsLockActive);
    }
  };

  const handleKeyEvent = useCallback(
    (event, isKeyDown) => {
      const { code, key } = event;

      if (key === "CapsLock") {
        updateCapsLockState(event);
        console.log(`Caps Lock is ${capsLockActive ? "ON" : "OFF"}`);
        return;
      }

      if (key === "Tab") {
        event.preventDefault();
        textareaRef.current.focus();
      }

      if (key === "Shift") setShiftPressed(isKeyDown);

      const normalizedCode = code.toUpperCase();

      setActiveKeys((prevKeys) => {
        if (isKeyDown) {
          if (!prevKeys.includes(normalizedCode)) {
            return [...prevKeys, normalizedCode];
          }
        } else {
          return prevKeys.filter((item) => item !== normalizedCode);
        }
        return prevKeys;
      });
    },
    [capsLockActive]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyEvent(e, true);
    };
    const handleKeyUp = (e) => {
      handleKeyEvent(e, false);
      updateCapsLockState();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
    };
  }, [handleKeyEvent]);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <MTHeader />
      <div className="wrapper">
        <div className="switcher-wrapper">
          <ContentSwitcher
            onChange={(e) => {
              setLanguage(e.name);
              setShiftPressed(false);
              setCapsLockActive(false);
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
        <div
          className={`textarea-wrapper ${
            language === "malayalam" ? "malayalam-textarea" : ""
          }`}
        >
          <TextArea ref={textareaRef} labelText="" rows={4} id="text-area-1" />
        </div>
        <div className="keyboard-wrapper">
          <Keyboard
            handleKeyPress={handleKeyEvent}
            activeKeys={activeKeys}
            shiftPressed={shiftPressed || capsLockActive}
            layout={language === "english" ? englishLayout : malayalamLayout}
            malayalamKeyMap={malayalamKeyMap}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
