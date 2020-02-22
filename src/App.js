import React from "react";
import "./App.css";
import User from "./Users/Pages/User";
import Navbar from "./Shares/Navbar/Navbar";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <User />
    </React.Fragment>
  );
}

export default App;
