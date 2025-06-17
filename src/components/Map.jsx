import "../styles/Map.css";
function Map(props) {
  return (
    <div className="Map" id={props.id}>
      <p>Q{props.id}. Mark the following on the map </p>
      <label className="MapLabel">Marks</label>
      <input
        type="number"
        className="MapInputMarks"
        value={props.input.marks}
        onChange={(e) => props.changeInput(props.id, "marks", e)}
      />
      <label className="MapLabel">Enter options</label>
      <input
        className="MapInput"
        value={props.input.option1}
        onChange={(e) => props.changeInput(props.id, "option1", e)}
      />
      <input
        className="MapInput"
        value={props.input.option2}
        onChange={(e) => props.changeInput(props.id, "option2", e)}
      />
      <input
        className="MapInput"
        value={props.input.option3}
        onChange={(e) => props.changeInput(props.id, "option3", e)}
      />
      <input
        className="MapInput"
        value={props.input.option4}
        onChange={(e) => props.changeInput(props.id, "option4", e)}
      />
    </div>
  );
}
export default Map;
