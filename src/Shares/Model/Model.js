import React from "react";
import "./Model.css";

export default function Model(props) {
  const SetShowValue = () => {
    props.CloseModel();
  };
  return (
    <div id="Model">
      <div id="Model_Info__Section">
        <h2>Name Of Place</h2>
        <h3>Description Of Place</h3>
      </div>
      <div id="Model_Action__Section">
        <button onClick={SetShowValue}>Close</button>
      </div>
    </div>
  );
}
