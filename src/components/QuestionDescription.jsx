import "../styles/QuestionDescription.css";
function QuestionDescription(props) {
  return (
    <div className="QuestionDescription">
      <label className="QuestionDescriptionLabel">
        Enter a description of the questions that follows{" "}
      </label>
      <textarea
        value={props.input.description}
        onChange={(e) => props.changeInput(props.id, "description", e)}
        className="QuestionDescriptionInput"
      />
    </div>
  );
}

export default QuestionDescription;
