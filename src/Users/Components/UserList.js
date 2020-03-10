import React from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

export default function UserList({ name, image, places }) {
  return (
    // It will show All user Card with there name place and image just like an overview-
    <React.Fragment>
      <Link to="/:uid/places" className="user_Li">
        <div className="user_img">
          <img src={`http://localhost:5000/${image}`} alt="No Preview " />
        </div>
        <div className="user_info">
          <h3>{name}</h3>
          <h4>{places}</h4>
        </div>
      </Link>
    </React.Fragment>
  );
}
