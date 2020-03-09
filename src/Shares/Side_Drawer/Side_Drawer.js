import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Appcontext } from "../Context/AppContext";
import "./Side_Drawer.css";

export default function Side_Drawer(props) {
  const Auth = useContext(Appcontext);
  const SetShowState = () => {
    props.CloseSideBar();
  };

  const Content = (
    <React.Fragment>
      <ul id="side_drawer_ul" onClick={SetShowState}>
        {!Auth.isLoggedin && (
          <li className="side_drawer__li">
            <Link to="/">ALL USERS</Link>
          </li>
        )}
        {Auth.isLoggedin && (
          <li className="side_drawer__li">
            <Link to={`/${Auth.loggedInUser}/places`}>MY PLACES</Link>
          </li>
        )}
        {Auth.isLoggedin && (
          <li className="side_drawer__li">
            <Link to="/addplace">ADD PLACE</Link>
          </li>
        )}
        {!Auth.isLoggedin && (
          <li className="side_drawer__li">
            <Link to="/auth">AUTHENTICATE</Link>
          </li>
        )}
        {Auth.loggedInUser && (
          <li className="side_drawer__li">
            <Link to="/login" onClick={Auth.logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
  return ReactDOM.createPortal(Content, document.getElementById("dropdown"));
}
