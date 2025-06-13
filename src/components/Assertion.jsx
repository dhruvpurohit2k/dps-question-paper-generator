import "../styles/Assertion.css";
function Assertion(props) {
  return (
    <div className="Assertion" id={props.id}>
      <p>Q{props.id}. Assertion Quesion </p>
      <label className="AssertionLabel">Assertion</label>
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "assertion", event);
        }}
        value={props.input.assertion}
      />
      <label className="AssertionLabel">Reason</label>
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "reason", event);
        }}
        value={props.input.reason}
      />
      <label className="AssertionLabel">Marks</label>
      <input
        type="number"
        className="AssertionInputMarks"
        onChange={(event) => {
          props.changeInput(props.id, "marks", event);
        }}
        value={props.input.marks}
      />
      <label className="AssertionLabel">Options</label>
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "option1", event);
        }}
        value={props.input.option1}
      />
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "option2", event);
        }}
        value={props.input.option2}
      />
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "option3", event);
        }}
        value={props.input.option3}
      />
      <textarea
        className="AssertionInput"
        onChange={(event) => {
          props.changeInput(props.id, "option4", event);
        }}
        value={props.input.option4}
      />
    </div>
  );
}

export default Assertion;
