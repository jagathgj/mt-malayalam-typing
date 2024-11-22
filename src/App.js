import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextArea, Dropdown, Button } from "@carbon/react";
import { Renew } from "@carbon/icons-react";
import Confetti from "react-confetti";
import MTHeader from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import layout from "./layout.json";

const App = () => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [confettiShown, setConfettiShown] = useState(false);

  const textareaRef = useRef();
  const language = "malayalam";

  const englishLayout = layout.englishLayout;
  const malayalamLayout = layout.malayalamLayout;
  const levelsData = layout.levels;

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
      if (levelCompleted) return;

      const { code, key } = event;

      if (key === "CapsLock") {
        updateCapsLockState(event);
        return;
      }

      if (key === "Tab") {
        event.preventDefault();
        textareaRef.current.focus();
      }

      if (key === "Shift") setShiftPressed(isKeyDown);

      const normalizedCode = code.toUpperCase();

      const userInput = textareaRef?.current?.value.trim();
      const currentCharacter =
        levelsData[currentLevel]?.characters[currentIndex]?.character;

      if (
        (levelsData[currentLevel]?.level === "വാക്യങ്ങൾ(Sentences)" &&
          userInput === currentCharacter) ||
        userInput.endsWith(currentCharacter)
      ) {
        if (currentIndex + 1 < levelsData[currentLevel]?.characters.length) {
          textareaRef.current.value += " ";
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          // Level completed
          setLevelCompleted(true);
          setConfettiShown(true);
          textareaRef.current.value = "";
        }
      }

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
    [currentIndex, levelsData, currentLevel, levelCompleted]
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

  const handleLevelChange = (selectedLevel) => {
    setCurrentLevel(selectedLevel.value);
    setCurrentIndex(0);
    setLevelCompleted(false);
    if (textareaRef.current) textareaRef.current.value = "";
  };

  const completionMessage = `പൊളി!! നിങ്ങൾ${
    " " + levelsData[currentLevel]?.label + " "
  } പൂർത്തിയാക്കിയിരുന്നു`;

  const currentCharacter =
    levelsData[currentLevel]?.characters[currentIndex]?.character;

  const currentTip = levelsData[currentLevel]?.characters[currentIndex]?.tip;

  const levels = Object.keys(levelsData).map((key) => ({
    value: key,
    label: levelsData[key].label
  }));

  useEffect(() => {
    if (levelCompleted && confettiShown) {
      const timeout = setTimeout(() => {
        setConfettiShown(false);
        setShiftPressed(false);
        setActiveKeys([]);
        textareaRef?.current?.focus();
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [levelCompleted, confettiShown]);

  useEffect(() => {
    setConfettiShown(false);
  }, [currentLevel]);

  return (
    <div className="container">
      <MTHeader />
      <div className="wrapper">
        {levelCompleted && confettiShown && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            run={true}
            numberOfPieces={!confettiShown ? 0 : 200}
            tweenDuration={5000}
          />
        )}
        <div className="screen-wrapper">
          <div className="heading-wrapper">
            {levelCompleted ? (
              <div className="completion-message">
                <h5>{completionMessage}</h5>
              </div>
            ) : (
              <h4>{currentCharacter}</h4>
            )}
          </div>
          {currentTip !== "" && (
            <div className="tip-wrapper">{`Tip: ${currentTip}`}</div>
          )}
        </div>

        <div className="toolbar-wrapper">
          <div className="level-wrapper">
            <Dropdown
              id="inline"
              titleText={`Level - ${currentLevel}`}
              initialSelectedItem={levels[0]}
              label={levels.find((level) => level.value === currentLevel).label}
              type="default"
              items={levels}
              itemToString={(item) => (item ? item.label : "")}
              onChange={({ selectedItem }) => handleLevelChange(selectedItem)}
            />

            <div className="restart-wrapper">
              <Button
                kind="secondary"
                renderIcon={Renew}
                iconDescription="Restart the level"
                size="md"
                onClick={() => {
                  setLevelCompleted(false);
                  setShiftPressed(false);
                  setCurrentIndex(0);
                  setActiveKeys([]);
                  if (textareaRef && textareaRef.current) {
                    textareaRef.current.value = "";
                    textareaRef.current.focus();
                  }
                }}
              >
                Restart
              </Button>
            </div>
          </div>
          <div className="status-wrapper">
            <span>Completed :&nbsp;</span>
            <span className="progress">{` ${" " + currentIndex}`}</span>
            <span>/</span>
            <span className="progress">
              {levelsData[currentLevel]?.characters.length}
            </span>
          </div>
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
