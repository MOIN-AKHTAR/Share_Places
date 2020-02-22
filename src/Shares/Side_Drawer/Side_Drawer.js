import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./Side_Drawer.css";

export default function Side_Drawer(props) {
  const SetShowState = () => {
    props.CloseSideBar();
  };
  const Content = (
    <React.Fragment>
      <ul id="side_drawer_ul" onClick={SetShowState}>
        <li className="side_drawer__li">
          <Link to="/">ALL USERS</Link>
        </li>
        <li className="side_drawer__li">
          <Link to="/:uid/places">MY PLACES</Link>
        </li>
        <li className="side_drawer__li">
          <Link to="/addplace">ADD PLACE</Link>
        </li>
        <li className="side_drawer__li">
          <Link to="/auth">AUTHENTICATE</Link>
        </li>
      </ul>
    </React.Fragment>
  );
  return ReactDOM.createPortal(Content, document.getElementById("dropdown"));
}
