import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const App = () => {
  const [title, setTitle] = useState("");
  const [titleFinal, setTitleFinal] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");

  const firstInput = useRef(0);
  useEffect(() => {
    const pdfDefinition = {
      defaultStyle: {
        columnGap: 20
      },
      info: {
        title: "awesome Document",
        author: "john doe",
        subject: "subject of document",
        keywords: "keywords for document"
      },
      content: [
        ...(titleFinal && [
          {
            text: `Direction: ${titleFinal}`,
            style: "header"
          }
        ]),
        ...questions.map((item, index) => [
          {
            text: `${index + 1}. ${item.question}`,
            margin: [0, 10, 0, 5]
          },
          {
            columns: [
              {
                width: "*",
                text: `a. ${item.a}`
              },
              { width: "*", text: `c. ${item.b}` }
            ]
          },
          {
            columns: [
              {
                width: "*",
                text: `b. ${item.c}`
              },
              { width: "*", text: `d. ${item.d}` }
            ]
          }
        ])
      ]
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.getDataUrl(url => setUrl(url));
  }, [questions, titleFinal]);
  const addItem = () => {
    setQuestions([
      ...questions,
      { question, a: optionA, b: optionB, c: optionC, d: optionD }
    ]);
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh"
      }}
    >
      <div
        id="container"
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          padding: "3rem"
        }}
      >
        {!titleFinal ? (
          <>
            <label htmlFor="">
              Direction: ( Type and Press enter to set Direction. )
            </label>
            <input
              value={title}
              type="text"
              onChange={e => {
                setTitle(e.target.value.trim());
                e.target.value = "";
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  setTitleFinal(e.target.value.trim());
                  e.target.value = "";
                  firstInput.current.focus();
                }
              }}
            />
          </>
        ) : (
          <h3 style={{ marginLeft: "5px" }}>{titleFinal}</h3>
        )}

        <label htmlFor="">Question:</label>
        <textarea
          ref={firstInput}
          value={question}
          onChange={e => {
            setQuestion(e.target.value.trim());
            e.target.value = "";
          }}
        />
        <label htmlFor="">Option a:</label>
        <input
          value={optionA}
          type="text"
          onChange={e => {
            setOptionA(e.target.value.trim());
            e.target.value = "";
          }}
        />
        <label htmlFor="">Option b:</label>
        <input
          type="text"
          value={optionB}
          onChange={e => {
            setOptionB(e.target.value.trim());
            e.target.value = "";
          }}
        />
        <label htmlFor="">Option c:</label>
        <input
          type="text"
          value={optionC}
          onChange={e => {
            setOptionC(e.target.value.trim());
            e.target.value = "";
          }}
        />
        <label htmlFor="">Option d:</label>
        <input
          value={optionD}
          type="text"
          onChange={e => {
            setOptionD(e.target.value.trim());
            e.target.value = "";
          }}
        />
        <button onClick={addItem}>Create Item</button>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          style={{
            width: "100%",
            height: "100%"
          }}
          src={url}
        />
      </div>
    </div>
  );
};

export default App;
