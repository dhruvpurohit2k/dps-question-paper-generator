import React, { useState } from "react";
import "../styles/GeneralInstruction.css";
function GeneralInstructions(props) {
  console.log(props);
  return (
    <div className="GeneralInstructions">
      <p>General Instructions</p>
      {props.input.instructions.map((instruction, idx) => {
        return (
          <div className="GeneralInstruction" key={idx}>
            <label>Instruction {idx + 1} : </label>
            <input
              value={props.input.instructions[idx]}
              key={idx}
              onChange={(e) => props.editInstruction(idx, e.target.value)}
            />
          </div>
        );
      })}
      <button onClick={props.addInstruction}>ADD INSTRUCTION</button>
    </div>
  );
}

export default GeneralInstructions;
