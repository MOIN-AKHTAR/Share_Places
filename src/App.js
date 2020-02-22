import React from "react";
import "./App.css";
import User from "./Users/Pages/User";
import Navbar from "./Shares/Navbar/Navbar";
import Places from "./Places/Pages/Places";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/:uid/places" exact component={Places} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
