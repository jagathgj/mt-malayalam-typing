import React, { useEffect } from "react";
import "./keyboard.scss";

const Keyboard = ({ handleKeyPress, activeKeys, shiftPressed, layout }) => {
  const rows = layout[shiftPressed ? "shifted" : "normal"];

  useEffect(() => {
    console.log(shiftPressed, "shift");
  }, [shiftPressed]);

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <ul key={`row-${rowIndex}`} className={`row row-${rowIndex}`}>
          {row.map((key, colIndex) => (
            <li key={`${rowIndex}-${colIndex}`} className={key.className}>
              <button
                className={`cds-btn ${
                  activeKeys.includes(key.key) ? "active" : ``
                } ${
                  key.wide && key.extraWide
                    ? "cds-btn--primary"
                    : key.className === "enter"
                    ? "cds-btn--danger"
                    : "cds-btn--secondary"
                }`}
                onMouseDown={(e) => handleKeyPress(key.key, e, true)}
                onMouseUp={(e) => handleKeyPress(key.key, e, false)}
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
