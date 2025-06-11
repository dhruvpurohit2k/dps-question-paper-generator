import "../styles/LongQuestion.css";
import React, { useState } from "react";
function LongQuestion(props) {
  return (
    <div className="LongQuestion" id={props.id}>
      <p>Q{props.id}. Source-based paragraph questions</p>
      <label className="LongQuestionLabel">Enter the passage </label>
      <textarea
        wrap="soft"
        value={props.input.source}
        onChange={(e) => props.changeInput(props.id, "source", e)}
      ></textarea>
      <div className="QuestionMarksWrapper">
        <label className="LongQuestionLabel">Enter Question 1 </label>
        <label className="LongQuestionLabel">Marks</label>
        <input
          className="LongQuestionInput"
          value={props.input.question1.question}
          onChange={(e) =>
            props.changeInput(props.id, ["question1", "question"], e)
          }
        />
        <input
          className="LongQuestionInput"
          type="number"
          value={props.input.question1.marks}
          onChange={(e) =>
            props.changeInput(props.id, ["question1", "marks"], e)
          }
        />
      </div>
      <div className="QuestionMarksWrapper">
        <label className="LongQuestionLabel">Enter Question 2 </label>
        <label className="LongQuestionLabel">Marks</label>
        <input
          className="LongQuestionInput"
          value={props.input.question2.question}
          onChange={(e) =>
            props.changeInput(props.id, ["question2", "question"], e)
          }
        />
        <input
          className="LongQuestionInput"
          value={props.input.question2.marks}
          type="number"
          onChange={(e) =>
            props.changeInput(props.id, ["question2", "marks"], e)
          }
        />
      </div>
      <div className="QuestionMarksWrapper">
        <label className="LongQuestionLabel">Enter Question 3 </label>
        <label className="LongQuestionLabel">Marks</label>
        <input
          className="LongQuestionInput"
          value={props.input.question3.question}
          onChange={(e) =>
            props.changeInput(props.id, ["question3", "question"], e)
          }
        />
        <input
          className="LongQuestionInput"
          value={props.input.question3.marks}
          type="number"
          onChange={(e) =>
            props.changeInput(props.id, ["question3", "marks"], e)
          }
        />
      </div>
      <div className="QuestionMarksWrapper">
        <label className="LongQuestionLabel">Enter Question 4 </label>
        <label className="LongQuestionLabel">Marks</label>
        <input
          className="LongQuestionInput"
          value={props.input.question4.question}
          onChange={(e) =>
            props.changeInput(props.id, ["question4", "question"], e)
          }
        />
        <input
          type="number"
          className="LongQuestionInput"
          value={props.input.question4.marks}
          onChange={(e) =>
            props.changeInput(props.id, ["question4", "marks"], e)
          }
        />
      </div>
    </div>
  );
}

export default LongQuestion;
