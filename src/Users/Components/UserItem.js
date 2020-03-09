import React from "react";
import UserList from "./UserList";
import "./UserItem.css";

export default function UserItem(props) {
  if (props.items.Users.length === 0) {
    return (
      <h1
        style={{
          textAlign: "center",
          color: "red"
        }}
      >
        No User Found :(
      </h1>
    );
  } else {
    return (
      <ul id="User_Ul">
        <h1>USERS LIST</h1>
        {props.items.Users.map(User => (
          <UserList
            id={User._id}
            name={User.name}
            image={User.image}
            places={User.places.length}
            key={User._id}
          />
        ))}
      </ul>
    );
  }
}
