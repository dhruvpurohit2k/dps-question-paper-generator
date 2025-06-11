import "../styles/BasicQuestion.css";
import React, { useState } from "react";
function BasicQuestion(props) {
  const [marks, setMarks] = useState("");
  const [question, setQuestion] = useState("");
  function handleChange(fn, event) {
    fn(event.target.value);
  }
  return (
    <div className="BasicQuestion" id={props.id}>
      <p>
        Q{props.id}. {props.BasicQuestionType}
      </p>
      <div className="QuestionMarksWrapper">
        <label className="BasicQuestionLabel">Enter Question</label>
        <label className="BasicQuestionLabel">Marks</label>
        <textarea
          clasName="BaiscQuestionInput"
          onChange={(event) => props.changeInput(props.id, "question", event)}
          value={props.input.question}
        />
        <input
          type="number"
          clasName="BaiscQuestionInput"
          onChange={(event) => props.changeInput(props.id, "marks", event)}
          value={props.input.marks}
        />
      </div>
    </div>
  );
}
export default BasicQuestion;
