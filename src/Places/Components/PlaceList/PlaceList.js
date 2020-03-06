import React, { useCallback } from "react";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Bakground/Background";
import { useModelHooks } from "../../../Shares/Hooks/modelHooks";
import "./PlaceList.css";

export default function PlaceList(props) {
  const [ShowModelState, ShowModel] = useModelHooks();
  const traverse = useCallback(() => {
    window.location.assign("/new/place");
  });
  return (
    <React.Fragment>
      {ShowModelState && (
        <React.Fragment>
          <Background />
          <Model CloseModel={ShowModel} />
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
          <button onClick={traverse}>Create Place</button>
        </div>
      </li>
    </React.Fragment>
  );
}
