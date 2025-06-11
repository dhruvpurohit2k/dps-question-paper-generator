import "../styles/PaperDetails.css";
function PaperDetails(props) {
  const currYear = new Date().getFullYear();
  return (
    <div id="PaperDetails">
      <div className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Type of Paper</label>
        <select
          className="PaperDetailsInput"
          onChange={(event) => props.changeInput(props.id, "paperType", event)}
          value={props.input.paperType}
        >
          <option>UNIT TEST</option>
          <option>{"FINAL EXAM " + `(${currYear}-${currYear + 1})`}</option>
          <option>
            {"HALF YEARLY EXAMINATION " + `(${currYear}-${currYear + 1})`}
          </option>
        </select>
      </div>
      <div></div>
      <div id="PaperDetails-Class" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Class </label>
        <select
          className="PaperDetailsInput"
          onChange={(event) => props.changeInput(props.id, "grade", event)}
          value={props.input.grade}
        >
          <option value="V">V</option>
          <option value="VI">VI</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
          <option value="IX">IX</option>
          <option value="X">X</option>
        </select>
      </div>
      <div id="PaperDetails-Time" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Time </label>
        <select
          className="PaperDetailsInput"
          value={props.input.time}
          onChange={(e) => props.changeInput(props.id, "time", e)}
        >
          <option>1 HOUR</option>
          <option>1 HOUR 30 MINS</option>
          <option>2 HOUR</option>
          <option>2 HOUR 30 MINS</option>
          <option>3 HOUR</option>
        </select>
      </div>
      <div id="PaperDetails-Subject" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Subject </label>
        <select
          className="PaperDetailsInput"
          value={props.input.subject}
          onChange={(e) => props.changeInput(props.id, "subject", e)}
        >
          <option>SOCIAL STUDIES</option>
          <option>MATHEMATICS</option>
          <option>SCIENCE</option>
          <option>ENGLISH</option>
        </select>
      </div>
      <div id="PaperDetails-Marks" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Marks </label>
        <select
          className="PaperDetailsInput"
          value={props.input.marks}
          onChange={(e) => props.changeInput(props.id, "marks", e)}
        >
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>60</option>
          <option>70</option>
          <option>80</option>
        </select>
      </div>
      <div id="PaperDetails-Date" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Date </label>
        <input
          className="PaperDetailsInput"
          type="date"
          value={props.input.date}
          onChange={(e) => props.changeInput(props.id, "date", e)}
        />
      </div>
      <div id="PaperDetails-Set" className="PaperDetailsItem">
        <label className="PaperDetailsLabel">Enter Set </label>
        <select
          className="PaperDetailsInput"
          value={props.input.set}
          onChange={(e) => props.changeInput(props.id, "set", e)}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
  );
}

export default PaperDetails;
