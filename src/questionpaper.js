//import * as fs from "fs";
import { saveAs } from "file-saver";
import {
  ImageRun,
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  AlignmentType,
  BorderStyle,
  VerticalAlign,
  HeightRule,
  LineRuleType,
} from "docx";

const typeToFunction = {
  GENERAL_INSTRUCTIONS: (data) => {
    return createInstructions(data);
  },
  QUESTION_DESCRIPTION: (data) => {
    return createQuestionTypeHeading(data.input.description);
  },
  PAPER_DETAILS: (data) => {
    return createAbout(data.input);
  },
  ASSERTION: (data) => {
    return createAssertionAndReason(data.options.id, {
      assertion: data.input.assertion,
      reason: data.input.reason,
      marks: data.input.marks,
      options: [
        data.input.option1,
        data.input.option2,
        data.input.option3,
        data.input.option4,
      ],
    });
  },
  SECTION: (data) => {
    return createSectionHeading(data.input.section);
  },

  MATCH_FOLLOWING: (data) => {
    return createMatchThefollowing(data.options.id, {
      question: data.input.question,
      columnB: [
        data.input.colB.row1,
        data.input.colB.row2,
        data.input.colB.row3,
        data.input.colB.row4,
      ],
      answers: [
        data.input.option1,
        data.input.option2,
        data.input.option3,
        data.input.option4,
      ],
      columnA: [
        data.input.colA.row1,
        data.input.colA.row2,
        data.input.colA.row3,
        data.input.colA.row4,
      ],
    });
  },
  MAP: (data) => {
    return createMapQuestion(data.options.id, {
      question: {
        string: "On the given map of India mark the following",
        marks: data.input.marks,
      },
      options: [
        data.input.option1,
        data.input.option2,
        data.input.option3,
        data.input.option4,
      ],
    });
  },
  QUESTION: (data) => {
    return createBasicQuestion(data.options.id, {
      string: data.input.question,
      marks: data.input.marks,
    });
  },
  LONG_QUESTION: (data) => {
    return createLongQuestion(data.options.id, {
      question: {
        string: data.input.source,
      },
      subQuestions: [
        {
          string: data.input.question1.question,
          marks: data.input.question1.marks,
        },
        {
          string: data.input.question2.question,
          marks: data.input.question2.marks,
        },
        {
          string: data.input.question3.question,
          marks: data.input.question3.marks,
        },
        {
          string: data.input.question4.question,
          marks: data.input.question4.marks,
        },
      ],
    });
  },
  COMPLETE_TABLE: (data) => {
    return createCompleteTheTable(data.options.id, {
      marks: data.input.marks,
      columnA: [data.input.meaning, data.input.question],
      columnB: [data.input.word, data.input.blanks],
    });
  },
  MULTIPLE_CHOICE: (data) => {
    if (data == null) return null;
    return createMCQ(data.options.id, {
      question: { string: data.input.question, marks: data.input.marks },
      options: [
        data.input.option1,
        data.input.option2,
        data.input.option3,
        data.input.option4,
      ],
    });
  },
};
const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  //top: BorderStyle.NONE,
  //bottom: BorderStyle.NONE,
  //left: BorderStyle.NONE,
  //right: BorderStyle.NONE,
  //insideVertical: BorderStyle.NONE,
  //insideHorizontal: BorderStyle.NONE,
};
const PAGE_MARGIN_HORIZONTAL = 0.5;
const PAGE_MARGIN_VERTICAL = 0.5;
const PAGE_WIDTH = 8.27 - PAGE_MARGIN_HORIZONTAL * 2;
const MyTable = {
  width: {
    size: convertInchesToDXA(PAGE_WIDTH),
    type: WidthType.DXA,
  },
  margins: {
    top: 60,
    bottom: 60,
    left: 20,
    right: 20,
  },
  borders: NO_BORDERS,
  columnWidths: [
    convertInchesToDXA(PAGE_WIDTH * 0.075),
    convertInchesToDXA(PAGE_WIDTH * 0.85),
    convertInchesToDXA(PAGE_WIDTH * 0.075),
  ],
  rows: [],
};
const convertBase64ToArrayBuffer = (base64String) => {
  try {
    // Remove the "data:image/...;base64," prefix
    const base64Data = base64String.split(",")[1];
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (error) {
    console.error("Error decoding Base64 image to ArrayBuffer:", error);
    return null;
  }
};
function createAbout(data) {
  const d = new Date(data.date);
  const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: "delhi public school - bopal, ahmedabad",
          allCaps: true,
          font: "Times New Roman",
          bold: true,
          size: 28,
        }),
        new TextRun({
          text: data.paperType,
          allCaps: true,
          break: 1,
          font: "Times New Roman",
          bold: true,
          size: 28,
        }),
      ],
      spacing: {
        before: 24 * 1 * 20,
        after: 24 * 1 * 20,
        line: 24 * 0.5 * 20,
        lineRule: LineRuleType.AUTO,
      },
      alignment: AlignmentType.CENTER,
    }),
    new Table({
      width: MyTable.width,
      borders: MyTable.borders,
      columnWidths: [
        convertInchesToDXA(PAGE_WIDTH * 0.5),
        convertInchesToDXA(PAGE_WIDTH * 0.5),
      ],
      rows: [
        new TableRow({
          height: {
            value: 0,
            rule: HeightRule.AUTO,
          },
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      text: "CLASS : " + data.grade,
                      bold: true,
                      allCaps: true,
                      size: 28,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      allCaps: true,
                      text: "TIME : " + data.time,
                      bold: true,
                      size: 28,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          height: {
            value: 0,
            rule: HeightRule.AUTO,
          },
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      allCaps: true,
                      text: "SUBJECT : " + data.subject,
                      bold: true,
                      size: 28,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: "M.M.: " + data.marks,
                      allCaps: true,
                      bold: true,
                      size: 28,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          height: {
            value: 0,
            rule: HeightRule.AUTO,
          },
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      allCaps: true,
                      text: "DATE : " + date,
                      bold: true,
                      size: 28,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "SET-" + data.set,
          bold: true,
          allCaps: true,
          size: 28,
          break: 1,
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    createGap(),
  ];
}
function createMapQuestion(number, question) {
  const INNER_TABLE_WIDTH = PAGE_WIDTH * 0.85;
  const cells = [];
  let ch = 97;
  question.options.forEach((option) => {
    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${String.fromCharCode(ch++)}) `,
                bold: true,
                font: "Times New Roman",
                size: 24,
              }),
              new TextRun({
                text: `${option}`,
                font: "Times New Roman",
                size: 24,
              }),
            ],
          }),
        ],
      }),
    );
  });
  const rows = [];
  let i = 0;
  while (i + 1 < cells.length) {
    rows.push(
      new TableRow({
        children: [cells[i], cells[i + 1]],
      }),
    );
    i += 2;
  }
  if (i < cells.length) {
    rows.push(
      new TableRow({
        children: [
          cells[i],
          new TableCell({
            children: [],
          }),
        ],
      }),
    );
  }
  return [
    new Table({
      width: MyTable.width,
      margins: MyTable.margins,
      borders: MyTable.borders,
      columnWidths: MyTable.columnWidths,
      rows: [
        getQuestionRow(
          "Q" + number + ".",
          question.question.string,
          question.question.marks,
        ),
        new TableRow({
          children: [
            new TableCell({ children: [] }),
            new TableCell({
              children: [
                new Table({
                  borders: MyTable.borders,
                  width: {
                    size: convertInchesToDXA(INNER_TABLE_WIDTH),
                    type: WidthType.DXA,
                  },
                  columnWidths: [
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                  ],
                  rows: [...rows],
                }),
              ],
            }),
            new TableCell({ children: [] }),
          ],
        }),
      ],
    }),
    createGap(),
  ];
}

function createAssertionAndReason(number, question) {
  const optionRows = new Array();
  let ch = 97;
  question.options.forEach((option) => {
    optionRows.push(
      getQuestionRow(String.fromCharCode(ch++) + ")", option, null),
    );
  });
  return [
    new Table({
      width: MyTable.width,
      columnWidths: MyTable.columnWidths,
      borders: MyTable.borders,
      margins: MyTable.margins,
      rows: [
        getQuestionRow(
          "Q" + number + ")",
          "Assertion (A) : " + question.assertion,
          " ",
        ),
        getQuestionRow(" ", "Reason (R) : " + question.reason, question.marks),
        getQuestionRow(null, "Choose correct option", null),
        ...optionRows,
      ],
    }),
    createGap(),
  ];
}
function createCompleteTheTable(number, question) {
  console.log(question);
  const INNER_TABLE_WIDTH = PAGE_WIDTH * 0.84;
  return [
    new Table({
      width: MyTable.width,
      borders: MyTable.borders,
      margins: MyTable.margins,
      columnWidths: MyTable.columnWidths,
      rows: [
        getQuestionRow(
          `Q${number}.`,
          "Complete the following table",
          question.marks,
        ),
        new TableRow({
          children: [
            new TableCell({
              children: [],
            }),
            new TableCell({
              children: [
                new Table({
                  width: {
                    size: convertInchesToDXA(INNER_TABLE_WIDTH),
                    type: WidthType.DXA,
                  },
                  margins: MyTable.margins,
                  columnWidths: [
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                  ],
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: question.columnA[0],
                                  font: "Times New Roman",
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: question.columnB[0],
                                  font: "Times New Roman",
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: question.columnA[1],
                                  font: "Times New Roman",
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          verticalAlign: AlignmentType.CENTER,
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: question.columnB[1],
                                  font: "Times New Roman",
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({ children: [] }),
          ],
        }),
      ],
    }),
    createGap(),
  ];
}

function convertInchesToTwip(number) {
  return number * 1440;
}
function convertInchesToDXA(number) {
  return number * 1440;
}

function convertInchesToEmu(number) {
  return number * 914400;
}

function convertInchesToDpixles(number) {
  return number * 96;
}
function createLongQuestion(number, questionObj) {
  const questionRows = new Array();
  let ch = 97;
  questionObj.subQuestions.forEach((q) => {
    questionRows.push(
      getQuestionRow(String.fromCharCode(ch++) + ") ", q.string, q.marks),
    );
  });
  return [
    new Table({
      borders: MyTable.borders,
      margins: MyTable.margins,
      width: MyTable.width,
      columnWidths: MyTable.columnWidths,
      rows: [
        getQuestionRow("Q" + number + ".", questionObj.question.string, null),
        ...questionRows,
      ],
    }),
    createGap(),
  ];
}
function createBasicQuestion(number, question) {
  return [
    new Table({
      width: MyTable.width,
      borders: MyTable.borders,
      columnWidths: MyTable.columnWidths,
      rows: [
        getQuestionRow("Q" + number + ".", question.string, question.marks),
      ],
    }),
    createGap(),
  ];
}
function createMatchThefollowing(number, matchQuestionObj) {
  const INNER_TABLE_WIDTH = PAGE_WIDTH * 0.84;
  const cellPadding = {
    top: 60,
    bottom: 60,
  };

  let char = 97;
  const len = matchQuestionObj.columnA.length;
  const tableRows = new Array();
  const options = new Paragraph({
    children: [
      new TextRun({
        text: `i) ${matchQuestionObj.answers[0]}`,
        size: 24,
      }),
      new TextRun({
        text: `ii) ${matchQuestionObj.answers[1]}`,
        size: 24,
        break: 1,
      }),
      new TextRun({
        text: `iii) ${matchQuestionObj.answers[2]}`,
        size: 24,
        break: 1,
      }),
      new TextRun({
        text: `iv) ${matchQuestionObj.answers[3]}`,
        size: 24,
        break: 1,
      }),
    ],
  });
  for (let i = 0; i < len; i++) {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            margins: cellPadding,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${i + 1}. ${matchQuestionObj.columnA[i]}`,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: cellPadding,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${String.fromCharCode(char++)}. ${matchQuestionObj.columnB[i]}`,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    );
  }
  return [
    new Table({
      width: MyTable.width,
      columnWidths: MyTable.columnWidths,
      borders: MyTable.borders,
      margins: MyTable.margins,
      rows: [
        getQuestionRow(
          "Q" + number + ".",
          matchQuestionObj.question.string,
          matchQuestionObj.question.marks,
        ),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Table({
                  width: {
                    size: convertInchesToDXA(INNER_TABLE_WIDTH),
                    type: WidthType.DXA,
                  },
                  columnWidths: [
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                    convertInchesToDXA(INNER_TABLE_WIDTH * 0.5),
                  ],
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          margins: cellPadding,
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: "COLUMN A",
                                  size: 24,
                                }),
                              ],
                              alignment: AlignmentType.CENTER,
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: "COLUMN B",
                                  size: 24,
                                }),
                              ],
                              alignment: AlignmentType.CENTER,
                            }),
                          ],
                        }),
                      ],
                    }),
                    ...tableRows,
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [] }),
            new TableCell({
              children: [options],
            }),
            new TableCell({ children: [] }),
          ],
        }),
      ],
    }),
    createGap(),
  ];
}
function createFillInTheBlanks(number, question) {
  const table = new Table({
    width: MyTable.width,
    columnWidths: MyTable.columnWidths,
    borders: MyTable.borders,
    rows: [getQuestionRow("Q" + number + ".", question.string, question.marks)],
  });
  return [table, createGap()];
}
function getQuestionNumber(number) {
  return new TextRun({
    text: `Q${number}.`,
    bold: true,
    size: 24,
  });
}
function getQuestionRow(character, string, marks) {
  console.log(`${character} ${string} ${marks}`);
  const row = new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: character == null || character == "" ? "" : character,
                font: "Times New Roman",
                size: 24,
                bold: true,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
        ],
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: string == null || string == "" ? "" : string,
                font: "Times New Roman",
                size: 24,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: marks == null || marks == "" ? "" : marks,
                font: "Times New Roman",
                size: 24,
              }),
            ],
          }),
        ],
      }),
    ],
  });

  return row;
}
function createGap() {
  return new Paragraph({
    spacing: {
      after: 24 * 0.25 * 20,
    },
    children: [
      new TextRun({
        text: "",
      }),
    ],
  });
}
function createMCQ(number, questionBody) {
  let ch = 97;
  let choices = new Array();
  questionBody.options.forEach((option) => {
    choices.push(getQuestionRow(String.fromCharCode(ch++) + ")", option, null));
  });
  return [
    new Table({
      width: MyTable.width,
      borders: MyTable.borders,
      margins: MyTable.margins,
      columnWidths: MyTable.columnWidths,
      rows: [
        getQuestionRow(
          "Q" + number + ".",
          questionBody.question.string,
          questionBody.question.marks,
        ),
        ...choices,
      ],
    }),
    createGap(),
  ];
}
function createQuestionTypeHeading(string) {
  return [
    new Table({
      margins: MyTable.margins,
      width: MyTable.width,
      columnWidths: MyTable.columnWidths,
      borders: MyTable.borders,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: string,
                      bold: true,
                      size: 24,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [],
            }),
          ],
        }),
      ],
    }),
    createGap(),
  ];
}
function createSectionHeading(section) {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `SECTION  - ${section}`,
          bold: true,
          size: 22,
        }),
      ],
      spacing: {
        before: 28 * 1 * 20,
        after: 28 * 1 * 20,
      },
      alignment: AlignmentType.CENTER,
    }),
    createGap(),
  ];
}
function createInstructions(data) {
  const listOfInstructions = [];
  data.input.instructions.forEach((instruction, i) => {
    listOfInstructions.push(
      new TextRun({
        text: `${i + 1}. ${instruction}`,
        size: 24,
        italics: true,
        break: 1,
      }),
    );
  });
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: "general instructions:\n",
          bold: true,
          allCaps: true,
          italics: true,
          size: 24,
          break: 1,
        }),
        ...listOfInstructions,
      ],
    }),
    createGap(),
    createGap(),
  ];
}

function createAdmissionNumberBoxes(numberOfBoxes) {
  const cells = [];
  // Use a smaller, more consistent box width
  const boxWidthInDxa = 500; // Reduced from 600 for better proportions

  for (let i = 0; i < numberOfBoxes; i++) {
    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            text: "", // Empty text for the box
            alignment: AlignmentType.CENTER,
          }),
        ],
        borders: {
          top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
          left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
          right: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        },
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: boxWidthInDxa,
          type: WidthType.DXA,
        },
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }),
    );
  }

  return new Table({
    rows: [
      new TableRow({
        height: {
          value: convertInchesToTwip(0.45),
          rule: HeightRule.EXACT,
        },
        children: [...cells],
      }),
    ],
    // Remove the table width specification to let cells control their own widths
    columnWidths: Array(numberOfBoxes).fill(boxWidthInDxa),
  });
}

function main(items, imageBase64) {
  const arrayOfBytes = convertBase64ToArrayBuffer(imageBase64);
  const logo = new Paragraph({
    children: [
      new ImageRun({
        data: arrayOfBytes,
        transformation: {
          width: convertInchesToDpixles(1.17),
          height: convertInchesToDpixles(0.65),
        },
        floating: {
          horizontalPosition: {
            relative: HorizontalPositionRelativeFrom.PAGE,
            offset: convertInchesToEmu(0.5),
          },
          verticalPosition: {
            relative: VerticalPositionRelativeFrom.PAGE,
            offset: convertInchesToEmu(0.23),
          },
        },
      }),
    ],
  });
  const setmargin = {
    page: {
      margin: {
        top: convertInchesToDXA(PAGE_MARGIN_VERTICAL),
        bottom: convertInchesToDXA(PAGE_MARGIN_VERTICAL),
        left: convertInchesToDXA(PAGE_MARGIN_HORIZONTAL),
        right: convertInchesToDXA(PAGE_MARGIN_HORIZONTAL),
      },
    },
  };
  const totalTableWidth = 4600; // DXA units
  const labelCellWidth = Math.floor(totalTableWidth * 0.3); // 25% for label
  const boxesCellWidth = Math.floor(totalTableWidth * 0.7); // 75% for boxes
  const admissionBlock = new Table({
    width: {
      size: totalTableWidth,
      type: WidthType.DXA,
    },
    float: {
      horizontalAnchor: HorizontalPositionRelativeFrom.PAGE,
      verticalAnchor: VerticalPositionRelativeFrom.PAGE,
      absoluteHorizontalPosition: convertInchesToTwip(5),
      absoluteVerticalPosition: convertInchesToTwip(0.315),
    },
    columnWidths: [labelCellWidth, boxesCellWidth], // Specify column widths
    rows: [
      new TableRow({
        height: {
          value: convertInchesToTwip(0.4),
          rule: HeightRule.EXACT,
        },
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: labelCellWidth, // Use calculated DXA value instead of percentage
              type: WidthType.DXA,
            },
            margins: {
              top: 0,
              bottom: 0,
              left: 0,
              right: convertInchesToTwip(0.1), // Small right margin for spacing
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "ADMN NO.",
                    font: "Times New Roman",
                    bold: true,
                    size: 22,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            width: {
              size: boxesCellWidth, // Use calculated DXA value instead of percentage
              type: WidthType.DXA,
            },
            verticalAlign: VerticalAlign.CENTER,
            margins: {
              top: 0,
              bottom: 0,
              left: convertInchesToTwip(0.1), // Small left margin for spacing
              right: 0,
            },
            children: [createAdmissionNumberBoxes(5)],
          }),
        ],
      }),
    ],
  });

  const rows = [];
  items.forEach((item) => {
    rows.push(...typeToFunction[item.instance]({ ...item }));
  });
  const doc = new Document({
    sections: [
      {
        properties: setmargin,
        children: [logo, admissionBlock, createGap(), ...rows],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, "example.docx");
  });
  //Packer.toBuffer(doc).then((buffer) => {
  //  fs.writeFileSync("My Document.docx", buffer);
  //});
}
export default main;
