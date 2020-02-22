import React from "react";
import UserItem from "../Components/UserItem";
export default function User() {
  return (
    <UserItem
      items={[
        {
          id: 1,
          name: "Moin Akhter",
          image: "/Imgs/Capture.PNG",
          places: 2
        },
        {
          id: 2,
          name: "Saqib Hussain",
          image: "/Imgs/IMG_20181224_164433.jpg",
          places: 5
        },
        {
          id: 3,
          name: "Iqra Saleem",
          image: "/Imgs/IMG_20181224_164433.jpg",
          places: 10
        }
      ]}
    />
  );
}
