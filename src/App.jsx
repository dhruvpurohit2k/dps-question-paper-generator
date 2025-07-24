import dpsLogo from "./assets/logo.png";
import indiaMap from "./assets/mapImage.jpg";
import "./App.css";
import "./styles/questionHolder.css";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import PaperDetails from "./components/PaperDetails.jsx";
import MultipleChoice from "./components/MultipleChoice.jsx";
import BasicQuestion from "./components/BasicQuestion.jsx";
import MatchFollowing from "./components/MatchFollowing.jsx";
import CompleteTable from "./components/CompleteTabel.jsx";
import Assertion from "./components/Assertion.jsx";
import LongQuestion from "./components/LongQuestion.jsx";
import Map from "./components/Map.jsx";
import AddItemMenu from "./components/AddItemMenu.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import QuestionDescription from "./components/QuestionDescription.jsx";

import main from "./questionpaper.js";
import GeneralInstructions from "./components/GeneralInstructions.jsx";
import { saveAs } from "file-saver";

async function convertUrlToBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob(); // Get the image as a Blob

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // reader.result will be the Base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob); // Read the Blob content as a Data URL (Base64)
    });
  } catch (error) {
    console.error("Error converting URL to Base64:", error);
    throw error; // Re-throw to handle it upstream
  }
}
function App() {
  const InstanceToComponent = {
    SECTION: {
      instance: "SECTION",
      component: SectionHeader,
      options: {
        changeInput: changeInput,
      },
    },
    QUESTION_DESCRIPTION: {
      component: QuestionDescription,
      options: {
        changeInput: changeInput,
      },
    },
    PAPER_DETAILS: {
      component: PaperDetails,
      options: { id: -1, changeInput: changeInput },
    },
    GENERAL_INSTRUCTIONS: {
      component: GeneralInstructions,
      options: {
        removeInstruction: removeInstruction,
        editInstruction: editInstruction,
        addInstruction: addInstruction,
        id: 0,
      },
    },
    MULTIPLE_CHOICE: {
      component: MultipleChoice,
      options: { changeInput: changeInput },
    },
    LONG_QUESTION: {
      component: LongQuestion,
      options: { changeInput: changeInput },
    },
    MATCH_FOLLOWING: {
      component: MatchFollowing,
      options: { changeInput: changeInput },
    },
    COMPLETE_TABLE: {
      component: CompleteTable,
      options: { changeInput: changeInput },
    },
    QUESTION: {
      component: BasicQuestion,
      options: { changeInput: changeInput },
    },
    ASSERTION: {
      component: Assertion,
      options: { changeInput: changeInput },
    },
    MAP: {
      component: Map,
      options: { changeInput: changeInput },
    },
  };
  const date = new Date().toISOString().slice(0, 10);
  const [uniqueId, setUniqueId] = useState(1);
  const [logoBase64, setLogoBase64] = useState(null);
  const [loadingLogo, setLoadingLogo] = useState(true);
  const [mapImage, setMapImage] = useState(null);
  useEffect(() => {
    const loadLogo = async (image, setter) => {
      try {
        setLoadingLogo(true);
        const base64Data = await convertUrlToBase64(image);
        setter(base64Data);
      } catch (err) {
        console.error("Failed to load DPS Logo as Base64:", err);
      } finally {
        setLoadingLogo(false);
      }
    };
    loadLogo(dpsLogo, setLogoBase64);
    loadLogo(indiaMap, setMapImage);
  }, []);
  const [items, setItems] = useState([
    {
      component: PaperDetails,
      instance: "PAPER_DETAILS",
      key: -1,
      options: { id: -1, changeInput: changeInput },
      input: {
        grade: "VII",
        time: "1",
        subject: "SOCIAL STUDIES",
        marks: "40",
        date: date,
        set: "A",
        paperType: "UNIT TEST",
      },
    },
  ]);
  const [jsonData, setJsonData] = useState(items);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setItems(jsonData);
  }, [jsonData]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const GIObj = {
    isQuestion: false,
    component: GeneralInstructions,
    instance: "GENERAL_INSTRUCTIONS",
    key: 0,
    options: {
      removeInstruction: removeInstruction,
      editInstruction: editInstruction,
      addInstruction: addInstruction,
      id: 0,
    },
    input: {
      instructions: [],
    },
  };

  const [addGI, setGI] = useState(false);
  const mainContentRef = useRef(null);

  const [addItemMenu, setAddItemMenu] = useState(false);
  const questionlist = [
    {
      isQuestion: true,
      name: "Multiple Choice",
      component: MultipleChoice,
      instance: "MULTIPLE_CHOICE",
      options: {
        changeInput: changeInput,
      },
      input: {
        marks: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
    },
    {
      isQuestion: true,
      name: "Source Based Questions",
      component: LongQuestion,
      instance: "LONG_QUESTION",
      options: {
        changeInput: changeInput,
      },
      input: {
        source: "",
        question1: {
          question: "",
          marks: "",
        },
        question2: {
          question: "",
          marks: "",
        },
        question3: {
          question: "",
          marks: "",
        },
        question4: {
          question: "",
          marks: "",
        },
      },
    },
    {
      isQuestion: true,
      name: "Match the Following",
      component: MatchFollowing,
      instance: "MATCH_FOLLOWING",
      options: {
        changeInput: changeInput,
      },
      input: {
        question: {
          string: "Match the following",
          marks: "",
        },
        colA: {
          row1: "",
          row2: "",
          row3: "",
          row4: "",
        },
        colB: {
          row1: "",
          row2: "",
          row3: "",
          row4: "",
        },
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
    },
    {
      isQuestion: true,
      name: "Complete the Table",
      component: CompleteTable,
      instance: "COMPLETE_TABLE",
      options: {
        changeInput: changeInput,
      },
      input: {
        question: "",
        meaning: "",
        word: "",
        marks: "",
        blanks: "",
      },
    },
    {
      isQuestion: true,
      name: "Assertion based question",
      component: Assertion,
      instance: "ASSERTION",
      options: {
        changeInput: changeInput,
      },
      input: {
        marks: "",
        assertion: "",
        reason: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
    },
    {
      isQuestion: true,
      name: "Question",
      component: BasicQuestion,
      instance: "QUESTION",
      options: {
        BasicQuestionType: "Write a question",
        changeInput: changeInput,
      },
      input: {
        marks: "",
        question: "",
      },
    },
    {
      isQuestion: true,
      name: "Fill in the blanks",
      component: BasicQuestion,
      instance: "QUESTION",
      options: {
        BasicQuestionType: "Fill in the blanks",
        changeInput: changeInput,
      },
      input: {
        marks: "",
        question: "",
      },
    },
    {
      isQuestion: true,
      name: "Map",
      instance: "MAP",
      component: Map,
      options: {
        changeInput: changeInput,
      },
      input: {
        marks: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        map: mapImage,
      },
    },
  ];
  const others = [
    {
      isQuestion: false,
      name: "Section",
      instance: "SECTION",
      component: SectionHeader,
      input: {
        section: "",
      },
      options: {
        changeInput: changeInput,
      },
    },
    {
      isQuestion: false,
      name: "Question Description",
      instance: "QUESTION_DESCRIPTION",
      component: QuestionDescription,
      input: {
        description: "",
      },
      options: {
        changeInput: changeInput,
      },
    },
  ];

  function saveItem() {
    const itemString = JSON.stringify(items);
    const blob = new Blob([itemString], { type: "application/json" });
    saveAs(
      blob,
      `${items[0].input.subject}-${items[0].input.paperType}-${items[0].input.date}.json`,
    );
    //const url = URL.createObjectURL(blob);
    //saveAs;
    //URL.revokeObjectURL(url);
  }
  function loadJson() {
    fileInputRef.current.click();
  }
  function loadItem(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/json") {
        alert("PLEASE UPLOAD A JSON FILE.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const parsedData = JSON.parse(content);
          if (parsedData) setJsonData(parsedData);
        } catch (err) {
          console.log("ERROR WHILE PARSING");
        }
      };

      reader.onerror = () => {
        console.log("COULDN'T READ THE FILE.");
      };
      reader.readAsText(file);
    } else {
      console.log("FILE WASN'T UPLOADED");
    }
  }
  function editInstruction(idx, string) {
    setItems((prevItems) => {
      return prevItems.map((item, i) => {
        if (i == 1) item.input.instructions[idx] = string;
        return item;
      });
    });
  }
  function addInstruction() {
    setItems((prevItems) => {
      return prevItems.map((item, i) => {
        if (i == 1) {
          item.input.instructions.push("");
        }
        return item;
      });
    });
  }
  function removeInstruction(idx) {
    setItems((prevItems) => {
      const removeInstructionItem = [];
      prevItems.filter((item) => {
        if (item.instance == "GENERAL_INSTRUCTIONS") {
          const newInstructions = [];
          item.input.instructions.forEach((instruction, i) => {
            if (i !== idx) newInstructions.push(instruction);
          });
          item.input.instructions = newInstructions;
        }
        removeInstructionItem.push(item);
      });
      return removeInstructionItem;
    });
  }
  function changeInput(id, field, event) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.options.id == id) {
          if (typeof field == "object") {
            const [questionNumber, option] = field;
            item.input[questionNumber][option] = event.target.value;
          } else item.input[field] = event.target.value;
        }
        return item;
      });
    });
  }

  function removeItem(itemRemove) {
    setItems((prevItems) => {
      const updatedItems = [];
      if (itemRemove.isQuestion) setQuestionNumber(questionNumber - 1);
      prevItems.forEach((item) => {
        if (item != itemRemove) {
          if (item.options.id > itemRemove.options.id) {
            updatedItems.push({
              ...item,
              options: { ...item.options, id: item.options.id - 1 },
            });
          } else {
            updatedItems.push(item);
          }
          return true;
        } else false;
      });
      return updatedItems;
    });
  }

  function addItem(newItem) {
    setAddItemMenu(!addItemMenu);
    if (newItem.isQuestion == true) {
      ((newItem.key = uniqueId),
        (newItem.options = {
          id: questionNumber,
          ...newItem.options,
        }));
      setUniqueId(uniqueId + 1);
      setQuestionNumber(questionNumber + 1);
    } else {
      newItem.key = uniqueId;
      newItem.options = {
        id: uniqueId,
        ...newItem.options,
      };
      setUniqueId(uniqueId + 1);
    }
    setItems((prevItems) => [...prevItems, newItem]);
  }
  function makeDoc() {
    if (logoBase64 !== null) {
      main(items, logoBase64);
    }
  }
  function addGeneralInstructions() {
    if (!addGI) {
      setItems((prevItems) => {
        return prevItems.toSpliced(1, 0, GIObj);
      });
    } else {
      setItems((prevItems) => {
        return prevItems.filter((_, i) => {
          return i !== 1;
        });
      });
    }
    setGI(!addGI);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1);

    return () => clearTimeout(timer);
  }, [addItemMenu]);

  return (
    <>
      <NavBar onSubmit={makeDoc} onSave={saveItem} onLoad={loadJson} />
      <input
        type="file"
        onChange={(e) => loadItem(e)}
        accept=".json,application/json"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div id="main-content" ref={mainContentRef}>
        {items.map((Item) => {
          const Component = InstanceToComponent[Item.instance].component;
          const options = {
            ...InstanceToComponent[Item.instance].options,
            ...Item.options,
          };
          return (
            <div className="QuestionWrapper" key={Item.key}>
              <Component input={Item.input} {...options} />
              {Component != PaperDetails && Component != GeneralInstructions ? (
                <button
                  className="QuestionWrapperClose"
                  onClick={() => {
                    removeItem(Item);
                  }}
                >
                  X
                </button>
              ) : Component !== GeneralInstructions ? (
                <div className="GIToggle">
                  <p> Add General Instructions ? </p>
                  <button
                    className="GIToggleButton"
                    onClick={() => {
                      addGeneralInstructions();
                    }}
                  >
                    {!addGI ? "Yes" : "No"}
                  </button>
                </div>
              ) : (
                <></>
              )}
              <div className="softLine"></div>
            </div>
          );
        })}
      </div>
      {!addItemMenu ? (
        <div id="add-item" onClick={() => setAddItemMenu(!addItemMenu)}>
          +
        </div>
      ) : (
        <AddItemMenu
          questions={questionlist}
          others={others}
          onSelect={addItem}
          onClick={() => setAddItemMenu(!addItemMenu)}
        />
      )}
    </>
  );
}

export default App;
