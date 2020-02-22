import React from "react";
import UserList from "./UserList";
import "./UserItem.css";

export default function UserItem(props) {
  if (props.items.length === 0) {
    return <h1>No User Found</h1>;
  } else {
    return (
      <ul id="User_Ul">
        <h1>USERS LIST</h1>
        {props.items.map(User => (
          <UserList
            id={User.id}
            name={User.name}
            image={User.image}
            places={User.places}
            key={User.id}
          />
        ))}
      </ul>
    );
  }
}
