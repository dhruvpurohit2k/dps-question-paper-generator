import "../styles/AddItemMenu.css";
import React, { useState } from "react";

function AddItemMenu(props) {
  const [isQuesOpened, setQuesOpened] = useState(true);
  const [isQuesTabOpened, setQuesTabOpened] = useState(true);
  const questionTabClass = `AddItemMenuButton ${isQuesTabOpened ? "open" : ""}`;
  const othersTabClass = `AddItemMenuButton ${!isQuesTabOpened ? "open" : ""}`;
  return (
    <div id="AddItemMenu">
      {isQuesOpened
        ? props.questions.map((question) => {
            return (
              <div
                key={Math.floor(Math.random() * 100)}
                className="AddItemMenuItem"
                onClick={() => props.onSelect(question)}
              >
                {question.name}
              </div>
            );
          })
        : props.others.map((other) => {
            return (
              <div
                key={Math.floor(Math.random() * 100)}
                className="AddItemMenuItem"
                onClick={() => {
                  return props.onSelect(other);
                }}
              >
                {other.name}
              </div>
            );
          })}
      <div className="AddItemMenuClose" onClick={props.onClick}>
        X
      </div>
      <button
        className={questionTabClass}
        onClick={() => {
          setQuesOpened(!isQuesOpened);
          setQuesTabOpened(!isQuesTabOpened);
        }}
      >
        Question
      </button>
      <button
        className={othersTabClass}
        onClick={() => {
          setQuesOpened(!isQuesOpened);
          setQuesTabOpened(!isQuesTabOpened);
        }}
      >
        Others
      </button>
    </div>
  );
}

export default AddItemMenu;
