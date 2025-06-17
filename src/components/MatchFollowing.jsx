import "../styles/MatchFollowing.css";
function MatchFollowing(props) {
  return (
    <div className="MatchFollowing" id={props.id}>
      <p>Q{props.id}. Match the Following </p>
      <div>
        <label className="MatchFollowingLabel">Marks</label>
        <input
          className="MatchFollowingInputMarks"
          value={props.input.marks}
          onChange={(e) => props.changeInput(props.id, "marks", e)}
        />
      </div>
      <div></div>

      <div className="MatchFollowingColumns ColA">
        <p>Column A </p>
        <label className="MatchFollowingLabel">Enter Column A values </label>
        <input
          className="MatchFollowingInput"
          value={props.input.colA.row1}
          onChange={(e) => props.changeInput(props.id, ["colA", "row1"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colA.row2}
          onChange={(e) => props.changeInput(props.id, ["colA", "row2"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colA.row3}
          onChange={(e) => props.changeInput(props.id, ["colA", "row3"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colA.row4}
          onChange={(e) => props.changeInput(props.id, ["colA", "row4"], e)}
        />
      </div>
      <div className="MatchFollowingColumns ColB">
        <p>Column B </p>
        <label className="MatchFollowingLabel">Enter Column B values </label>
        <input
          className="MatchFollowingInput"
          value={props.input.colB.row1}
          onChange={(e) => props.changeInput(props.id, ["colB", "row1"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colB.row2}
          onChange={(e) => props.changeInput(props.id, ["colB", "row2"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colB.row3}
          onChange={(e) => props.changeInput(props.id, ["colB", "row3"], e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.colB.row4}
          onChange={(e) => props.changeInput(props.id, ["colB", "row4"], e)}
        />
      </div>
      <div className="MatchFollowingOptions">
        <label>Enter options for the columns </label>
        <input
          className="MatchFollowingInput"
          value={props.input.option1}
          onChange={(e) => props.changeInput(props.id, "option1", e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.option2}
          onChange={(e) => props.changeInput(props.id, "option2", e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.option3}
          onChange={(e) => props.changeInput(props.id, "option3", e)}
        />
        <input
          className="MatchFollowingInput"
          value={props.input.option4}
          onChange={(e) => props.changeInput(props.id, "option4", e)}
        />
      </div>
    </div>
  );
}

export default MatchFollowing;
