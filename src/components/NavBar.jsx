import "../styles/NavBar.css";
import React, { useRef } from "react";
function NavBar(props) {
  return (
    <div id="NavBar">
      <h2 id="NavBarHeading"> Question Paper Generator</h2>
      <button
        id="SaveButton"
        className="NavButton"
        onClick={() => {
          props.onSave();
        }}
      >
        Save
      </button>
      <button
        className="NavButton"
        onClick={() => {
          props.onLoad();
        }}
      >
        Load
      </button>
      <button
        id="GenerateButton"
        className="NavButton"
        onClick={props.onSubmit}
      >
        Generate
      </button>
    </div>
  );
}

export default NavBar;
