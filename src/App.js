import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const questionSchema = Yup.object().shape({
  question: Yup.string().required("Queston required"),
  optionA: Yup.string()
    .trim()
    .required("Option A is required"),
  optionB: Yup.string()
    .trim()

    .required("Option B is required"),
  optionC: Yup.string()
    .trim()

    .required("Option C is required"),
  optionD: Yup.string()
    .trim()

    .required("Option D is required")
});

const App = () => {
  const [title, setTitle] = useState("");
  const [titleFinal, setTitleFinal] = useState("");
  const [url, setUrl] = useState("");
  const [questionRef, setQuestionRef] = useState("");
  const [questions, setQuestions] = useState([]);
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
                text: `a. ${item.optionA}`
              },
              { width: "*", text: `c. ${item.optionB}` }
            ]
          },
          {
            columns: [
              {
                width: "*",
                text: `b. ${item.optionC}`
              },
              { width: "*", text: `d. ${item.optionD}` }
            ]
          }
        ])
      ]
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.getDataUrl(url => setUrl(url));
  }, [questions, titleFinal]);

  return (
    <div
      style={{
        flexDirection: "row",
        height: "100vh",
        display: "flex"
      }}
      id="container"
    >
      <div style={{ padding: "3rem", width: "40%" }}>
        <Formik
          initialValues={{
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: ""
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            resetForm();
            questionRef.focus();
            setQuestions([...questions, values]);
          }}
          validationSchema={questionSchema}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,

            handleReset
          }) => {
            return (
              <>
                <p>Write Your Test Questions</p>
                {!titleFinal ? (
                  <>
                    <label htmlFor="">
                      Direction: ( Type and Press enter to set Direction. )
                    </label>
                    <input
                      value={title}
                      type="text"
                      onChange={e => {
                        setTitle(e.target.value);
                        e.target.value = "";
                      }}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setTitleFinal(e.target.value);
                          e.target.value = "";
                          questionRef.focus();
                        }
                      }}
                    />
                  </>
                ) : (
                  <h3 style={{ marginLeft: "5px" }}>{titleFinal}</h3>
                )}

                <Form style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Question:</label>
                  <Field
                    type="text"
                    name="question"
                    innerRef={el => {
                      setQuestionRef(el);
                    }}
                  />
                  <ErrorMessage name="question">
                    {msg => <div className="error">{msg}</div>}
                  </ErrorMessage>
                  <label htmlFor="">Option a:</label>

                  <Field type="text" name="optionA" />
                  <ErrorMessage name="optionA">
                    {msg => <div className="error">{msg}</div>}
                  </ErrorMessage>
                  <label htmlFor="">Option b:</label>

                  <Field type="text" name="optionB" />
                  <ErrorMessage name="optionB">
                    {msg => <div className="error">{msg}</div>}
                  </ErrorMessage>
                  <label htmlFor="">Option c:</label>
                  <Field type="text" name="optionC" />
                  <ErrorMessage name="optionC">
                    {msg => <div className="error">{msg}</div>}
                  </ErrorMessage>
                  <label htmlFor="">Option d:</label>
                  <Field type="text" name="optionD" />

                  <ErrorMessage name="optionD">
                    {msg => <div className="error">{msg}</div>}
                  </ErrorMessage>
                  <button type="submit">Add Question</button>
                </Form>
              </>
            );
          }}
        </Formik>
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
