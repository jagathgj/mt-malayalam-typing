import React from "react";
import "./keyboard.scss";

const Keyboard = ({ activeKeys, shiftPressed, layout }) => {
  const rows = layout[shiftPressed ? "shifted" : "normal"];
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <ul key={`row-${rowIndex}`} className={`row row-${rowIndex}`}>
          {row.map((key, colIndex) => (
            <li key={`${rowIndex}-${colIndex}`} className={key.className}>
              <button
                className={`cds-btn ${
                  activeKeys.includes(key.code.toUpperCase()) ? "active" : ""
                } ${
                  key.wide && key.extraWide
                    ? "cds-btn--primary"
                    : key.className === "enter"
                    ? "cds-btn--danger"
                    : "cds-btn--secondary"
                }`}
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
