import React from "react";
import ReactDOM from "react-dom";
import "./Background.css";

export default function Background(props) {
  const SetShowState = () => {
    props.SetShow();
  };
  const Content = <div id="Background" onClick={SetShowState}></div>;
  return ReactDOM.createPortal(Content, document.getElementById("background"));
}
