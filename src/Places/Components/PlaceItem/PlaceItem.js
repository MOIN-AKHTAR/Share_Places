import React from "react";
import PlaceList from "../PlaceList/PlaceList";
import "./PlaceItem.css";
export default function PlaceItem(props) {
  if (props.places.length === 0) {
    return (
      <div id="NoPlaceFound">
        <h1>No Place Found Add Some Places </h1>
      </div>
    );
  }
  return (
    <ul id="places_ul">
      {props.places.map(Place => (
        <PlaceList
          key={Place.id}
          name={Place.name}
          img={Place.img}
          address={Place.address}
          description={Place.description}
        />
      ))}
    </ul>
  );
}
