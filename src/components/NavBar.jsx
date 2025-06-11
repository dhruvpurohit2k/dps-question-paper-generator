import "../styles/NavBar.css";
function NavBar(props) {
  return (
    <div id="NavBar">
      <h2 id="NavBarHeading"> Question Paper Generator</h2>
      <button id="GenerateButton" onClick={props.onSubmit}>
        Generate
      </button>
    </div>
  );
}

export default NavBar;
