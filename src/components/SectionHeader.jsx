import "../styles/SectionHeader.css";
function SectionHeader(props) {
  return (
    <div className="SectionHeader">
      <label className="SectionHeaderLabel">Enter Section Name </label>
      <select
        className="SectionHeaderInput"
        value={props.input.section}
        onChange={(e) => {
          props.changeInput(props.id, "section", e);
        }}
      >
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        <option value="F"> F </option>
      </select>
    </div>
  );
}

export default SectionHeader;
