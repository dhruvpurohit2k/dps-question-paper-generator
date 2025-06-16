import "../styles/MultipleChoice.css";
import React, { useState } from "react";

function MultipleChoice(props) {
  return (
    <div className="MultipleChoice" id={`question${props.id}`}>
      <p>Q{props.id}. Multiple Choice question </p>
      <div className="MultipleChoiceWrapper">
        <label className="MultipleChoiceQuesiton"> Enter question </label>
        <label className="MultipleChoiceMarks"> Marks </label>
        <textarea
          className="MultipleChoiceInput"
          value={props.input.question}
          onChange={(e) => props.changeInput(props.id, "question", e)}
        />
        <input
          type="number"
          className="MultipleChoiceInput"
          value={props.input.marks}
          onChange={(e) => props.changeInput(props.id, "marks", e)}
        />
      </div>
      <label className="MultipleChoiceQuesiton"> Enter options </label>
      <textarea
        className="MultipleChoiceInput"
        value={props.input.option1}
        onChange={(e) => props.changeInput(props.id, "option1", e)}
      />
      <textarea
        className="MultipleChoiceInput"
        value={props.input.option2}
        onChange={(e) => props.changeInput(props.id, "option2", e)}
      />
      <textarea
        className="MultipleChoiceInput"
        value={props.input.option3}
        onChange={(e) => props.changeInput(props.id, "option3", e)}
      />
      <textarea
        className="MultipleChoiceInput"
        value={props.input.option4}
        onChange={(e) => props.changeInput(props.id, "option4", e)}
      />
    </div>
  );
}

export default MultipleChoice;
