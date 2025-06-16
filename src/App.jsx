import dpsLogo from "./assets/logo.png";

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

function App() {
  const date = new Date().toISOString().slice(0, 10);
  const [uniqueId, setUniqueId] = useState(1);
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
  const [dpsLogoBase64, setDpsLogoBase64] = useState(null);
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
            console.log(instruction);
            if (i !== idx) newInstructions.push(instruction);
          });
          item.input.instructions = newInstructions;
        }
        removeInstructionItem.push(item);
      });
      console.log(removeInstructionItem);
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
      (newItem.key = uniqueId),
        (newItem.options = {
          id: questionNumber,
          ...newItem.options,
        });
      setUniqueId(uniqueId + 1);
      setQuestionNumber(questionNumber + 1);
    }
    setItems((prevItems) => [...prevItems, newItem]);
  }
  function makeDoc() {
    if (dpsLogoBase64) {
      main(items, dpsLogo);
    } else {
      console.log("ERROR");
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
    const imageUrlToBase64 = async (url) => {
      try {
        // Fetch the image from its URL
        const response = await fetch(url);
        // Get the response as a Blob
        const blob = await response.blob();
        // Create a FileReader to convert the Blob to Base64
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // Resolve with Base64 data URL
          reader.onerror = reject; // Reject on error
          reader.readAsDataURL(blob); // Read as data URL
        });
      } catch (error) {
        console.error("Error converting DPS logo URL to Base64:", error);
        return null;
      }
    };

    // If dpsLogo exists (i.e., the import successfully gave a URL), convert it
    if (dpsLogo) {
      imageUrlToBase64(dpsLogo).then((base64Data) => {
        setDpsLogoBase64(base64Data); // Store the Base64 data in state
      });
    }
  }, []);
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
      <NavBar onSubmit={makeDoc} />
      <div id="main-content" ref={mainContentRef}>
        {items.map((Item) => {
          return (
            <div className="QuestionWrapper" key={Item.key}>
              <Item.component input={Item.input} {...Item.options} />
              {Item.component != PaperDetails &&
              Item.component != GeneralInstructions ? (
                <button
                  className="QuestionWrapperClose"
                  onClick={() => {
                    removeItem(Item);
                  }}
                >
                  X
                </button>
              ) : Item.component !== GeneralInstructions ? (
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
