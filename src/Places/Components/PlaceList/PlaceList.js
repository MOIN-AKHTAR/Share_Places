import React from "react";
import "./PlaceList.css";

export default function PlaceList(props) {
  return (
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
        <button>View On Map</button>
        <button>Edit Place</button>
        <button>Create Place</button>
      </div>
    </li>
  );
}
