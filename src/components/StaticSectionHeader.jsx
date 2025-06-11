import "../styles/StaticSectionHeader.css";
function StaticSectionHeader(props) {
  return (
    <div className="StaticSectionHeader">
      <p>Section {props.section}</p>
    </div>
  );
}

export default StaticSectionHeader;
