import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    console.log("Uppercase was clicked-" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "success");
  };
  const handleOnChange = (event) => {
    console.log("On change");
    setText(event.target.value);
  };

  const handleDownClick = () => {
    let newText2 = text.toLowerCase();
    setText(newText2);
    props.showAlert("Converted to lowercase", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text Cleared", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Voice enabled", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied to clipboard", "success");
  };

  const handleExtraSpace = () => {
    let newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed", "success");
  };
  const [text, setText] = useState("");

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div
          className={`mb-3 container text-${
            props.mode === "light" ? "dark" : "light"
          } `}
        >
          <textarea
            className="form-control"
            id="myBox"
            onChange={handleOnChange}
            value={text}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "grey",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="8"
          ></textarea>
        </div>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleUpClick}
        >
          Convert to UpperCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleDownClick}
        >
          Convert to LowerCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={speak}
        >
          speak
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleExtraSpace}
        >
          Remove Extra Space
        </button>
      </div>
      <div
        className={`container text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <h1>Your text summary</h1>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }
          words and {text.length} characters
        </p>
        <p>
          Read Time-
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            })}
          minutes
        </p>
        <p>
          No of sentences-
          {
            text.split(/[.?!]/g).filter((element) => {
              return element.length !== 0;
            }).length
          }
        </p>
        <h3>Preview</h3>
        <p>{text > 0 ? text : "write something in the box for preview"}</p>
      </div>
    </>
  );
}
// style={{
//   background: props.mode === "light" ? "#072544" : "light",
//   color: props.mode === "light" ? "dark" : "light",
// }}

// style={{
//   background: props.mode === "dark" ? "#072544" : "blue",
// }}
