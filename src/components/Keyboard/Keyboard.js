import React from "react";
// import { Button } from "@carbon/react";
import "./keyboard.scss";

const Keyboard = ({ handleKeyPress }) => {
  const rows = [
    [
      { label: "ESC", className: "esc", wide: true },
      { label: "1", className: "letter-keys", wide: false },
      { label: "2", className: "letter-keys", wide: false },
      { label: "3", className: "letter-keys", wide: false },
      { label: "4", className: "letter-keys", wide: false },
      { label: "5", className: "letter-keys", wide: false },
      { label: "6", className: "letter-keys", wide: false },
      { label: "7", className: "letter-keys", wide: false },
      { label: "8", className: "letter-keys", wide: false },
      { label: "9", className: "letter-keys", wide: false },
      { label: "0", className: "letter-keys", wide: false },
      { label: "-", className: "letter-keys", wide: false },
      { label: "+", className: "letter-keys", wide: false },
      { label: "BACK", className: "back", wide: true }
    ],
    [
      { label: "TAB", className: "tab", wide: true },
      { label: "Q", className: "letter-keys", wide: false },
      { label: "W", className: "letter-keys", wide: false },
      { label: "E", className: "letter-keys", wide: false },
      { label: "R", className: "letter-keys", wide: false },
      { label: "T", className: "letter-keys", wide: false },
      { label: "Y", className: "letter-keys", wide: false },
      { label: "U", className: "letter-keys", wide: false },
      { label: "I", className: "letter-keys", wide: false },
      { label: "O", className: "letter-keys", wide: false },
      { label: "P", className: "letter-keys", wide: false },
      { label: "[", className: "letter-keys", wide: false },
      { label: "]", className: "letter-keys", wide: false },
      { label: "\\", className: "letter-keys", wide: false }
    ],
    [
      { label: "CAPS", className: "caps", wide: true },
      { label: "A", className: "letter-keys", wide: false },
      { label: "S", className: "letter-keys", wide: false },
      { label: "D", className: "letter-keys", wide: false },
      { label: "F", className: "letter-keys", wide: false },
      { label: "G", className: "letter-keys", wide: false },
      { label: "H", className: "letter-keys", wide: false },
      { label: "J", className: "letter-keys", wide: false },
      { label: "K", className: "letter-keys", wide: false },
      { label: "L", className: "letter-keys", wide: false },
      { label: ":", className: "letter-keys", wide: false },
      { label: "''", className: "letter-keys", wide: false },
      { label: "ENTER", className: "enter", wide: true }
    ],
    [
      { label: "SHIFT", className: "left-shift", wide: true },
      { label: "Z", className: "letter-keys", wide: false },
      { label: "X", className: "letter-keys", wide: false },
      { label: "C", className: "letter-keys", wide: false },
      { label: "V", className: "letter-keys", wide: false },
      { label: "B", className: "letter-keys", wide: false },
      { label: "N", className: "letter-keys", wide: false },
      { label: "M", className: "letter-keys", wide: false },
      { label: ",", className: "letter-keys", wide: false },
      { label: ".", className: "letter-keys", wide: false },
      { label: ";", className: "letter-keys", wide: false },
      { label: "SHIFT", className: "right-shift", wide: true }
    ],
    [
      { label: "CTRL", className: "ctrl-left", wide: true },
      { label: "ALT", className: "alt-left", wide: true },
      { label: "COMMAND", className: "command-left", wide: true },
      { label: "SPACE", className: "space", wide: true, extraWide: true },
      { label: "COMMAND", className: "command-right", wide: true },
      { label: "ALT", className: "alt-right", wide: true },
      { label: "MENU", className: "menu", wide: true },
      { label: "CTRL", className: "ctrl-right", wide: true }
    ]
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <ul key={rowIndex} className={`row row-${rowIndex}`}>
          {row.map((key) => (
            <li key={key.id || key.label} className={key.className}>
              <button
                className={`cds-btn ${
                  key.wide && key.extraWide
                    ? "cds-btn--primary"
                    : key.className === "enter"
                    ? "cds-btn--danger"
                    : "cds-btn--secondary"
                }`}
                onClick={() => handleKeyPress(key.label)}
                onKeyUp={() => handleKeyPress(key.label)}
              >
                {key.label}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Keyboard;
