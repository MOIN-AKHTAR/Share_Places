import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import SideDrawer from "../Side_Drawer/Side_Drawer";
import Background from "../Bakground/Background";
import { Appcontext } from "../Context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const Auth = useContext(Appcontext);
  // State For Showing Sidebar
  const [Show, SetShow] = useState(false);
  const OpenSideBar = () => {
    SetShow(true);
  };
  const CloseSideBar = () => SetShow(false);

  const Content = (
    <div id="Navbar">
      {/* If Show==true then Side Bar Will Be Shown */}
      {Show && (
        <React.Fragment>
          <Background />
          <SideDrawer CloseSideBar={CloseSideBar} />
        </React.Fragment>
      )}
      <div id="Navbar_Heading">
        <ul id="burger_btn_ul" onClick={OpenSideBar}>
          <li className="burger_btn_li">
            <span></span>
          </li>
          <li className="burger_btn_li">
            <span></span>
          </li>
          <li className="burger_btn_li">
            <span></span>
          </li>
        </ul>
        <h1>YourPlaces</h1>
      </div>
      <ul id="Navbar_ul">
        {!Auth.isLoggedin && (
          <li className="Navbar_li">
            <Link to="/">All Users</Link>
          </li>
        )}
        {Auth.isLoggedin && (
          <li className="Navbar_li">
            <Link to={`/${Auth.loggedInUser}/places`}>My Places</Link>
          </li>
        )}
        {Auth.isLoggedin && (
          <li className="Navbar_li">
            <Link to="/addplace">Add Place</Link>
          </li>
        )}
        {!Auth.isLoggedin && (
          <li className="Navbar_li">
            <Link to="/login">Authenticat</Link>
          </li>
        )}
        {Auth.isLoggedin && (
          <li className="Navbar_li">
            <Link to="#" onClick={Auth.logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
  return ReactDOM.createPortal(Content, document.getElementById("navbar"));
}
