import React from "react";
import { useParams } from "react-router-dom";
import PlaceItem from "../Components/PlaceItem/PlaceItem";

export default function Places() {
  const Arr = [
    {
      uid: 1,
      id: 1,
      img: "/Imgs/Capture.PNG",
      name: "PlanetWare",
      address: "Asia",
      description: "No Description"
    },
    {
      uid: 2,
      id: 2,
      img: "/Imgs/IMG_20181224_164433.jpg",
      name: "Fuji Mountain",
      address: "Asia",
      description: "No Description"
    }
  ];
  // Extracting uid part of URL-
  const UserId = parseInt(useParams().uid);
  const FilteredArr = Arr.filter(Place => Place.uid === UserId);
  return <PlaceItem places={FilteredArr} />;
}
