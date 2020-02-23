import React, { useState } from "react";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Bakground/Background";
import "./PlaceList.css";

export default function PlaceList(props) {
  // Setting variable for showing or hiding Model-
  const [Show, SetShow] = useState(false);
  const ShowModel = () => {
    SetShow(true);
  };
  const CloseModel = () => {
    SetShow(false);
  };
  return (
    <React.Fragment>
      {Show && (
        <React.Fragment>
          <Background />
          <Model CloseModel={CloseModel} />
        </React.Fragment>
      )}
      <li id="places_list">
        <div id="list_img__section">
          <img src={props.img} alt="No Preview" />
        </div>
        <div id="list_info__section">
          <h1>{props.name}</h1>
          <h2>{props.address}</h2>
          <h3>{props.description}</h3>
        </div>
        <div id="list_action__section">
          <button onClick={ShowModel}>View On Map</button>
          <button>Edit Place</button>
          <button>Create Place</button>
        </div>
      </li>
    </React.Fragment>
  );
}
