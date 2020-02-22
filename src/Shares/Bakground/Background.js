import React from "react";
import ReactDOM from "react-dom";
import "./Background.css";

export default function Background() {
  const Content = <div id="Background"></div>;
  return ReactDOM.createPortal(Content, document.getElementById("background"));
}
