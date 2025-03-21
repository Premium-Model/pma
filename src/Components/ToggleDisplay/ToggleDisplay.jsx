import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";


const ToggleDisplay = ({ darkmode, HandleTheme, close }) => {
  return (
        <li className="mode">
                    <div className="moon-sun">
                      {darkmode ? (
                        <BsSun className="icon sun" />
                      ) : (
                        <BsMoon className="icon moon" />
                      )}
                    </div>
                    <span
                      className={
                        close
                          ? "sidebar-text close mode-text"
                          : "sidebar-text mode-text"
                      }
                    >
                      {darkmode ? "Light Mode" : "Dark Mode"}
                    </span>
    
                    <div className="toggle-switch" onClick={HandleTheme}>
                      <span
                        className={darkmode ? "switch dark-switch" : "switch"}
                      ></span>
                    </div>
                  </li>
  );
};

export default ToggleDisplay;
