import React from "react";
import ReactDOM from "react-dom";
import "./Side_Drawer.css";

export default function Side_Drawer() {
  const Content = (
    <React.Fragment>
      <ul id="side_drawer_ul">
        <li className="side_drawer__li">
          <a href="#">ALL USERS</a>
        </li>
        <li className="side_drawer__li">
          <a href="#">MY PLACES</a>
        </li>
        <li className="side_drawer__li">
          <a href="#">ADD PLACE</a>
        </li>
        <li className="side_drawer__li">
          <a href="#">AUTHENTICATE</a>
        </li>
      </ul>
    </React.Fragment>
  );
  return ReactDOM.createPortal(Content, document.getElementById("dropdown"));
}
