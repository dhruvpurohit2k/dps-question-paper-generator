import "../styles/CompleteTable.css";
function CompleteTable(props) {
  return (
    <div className="CompleteTable" id={props.id}>
      <p>Q{props.id}. Complete the table</p>
      <div className="CompleteTableWrapper">
        <label className="CompleteTableLabel">Marks</label>
        <input
          type="number"
          className="CompleteTableInput"
          value={props.input.marks}
          onChange={(e) => props.changeInput(props.id, "marks", e)}
        />
      </div>
      <label className="CompleteTableLabel">Complete the Table</label>
      <textarea
        className="CompleteTableInput"
        value={props.input.meaning}
        onChange={(e) => props.changeInput(props.id, "meaning", e)}
      />
      <textarea
        className="CompleteTableInput"
        value={props.input.word}
        onChange={(e) => props.changeInput(props.id, "word", e)}
      />
      <textarea
        className="CompleteTableInput"
        value={props.input.question}
        onChange={(e) => props.changeInput(props.id, "question", e)}
      />
      <textarea
        className="CompleteTableInput"
        value={props.input.blanks}
        onChange={(e) => props.changeInput(props.id, "blanks", e)}
      />
    </div>
  );
}
export default CompleteTable;
