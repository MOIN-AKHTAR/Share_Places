import React from "react";
import User from "./Users/Pages/User";
import Navbar from "./Shares/Navbar/Navbar";
import Places from "./Places/Pages/Places";
import NewPlace from "./Places/Pages/NewPlace";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <NewPlace />
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/:uid/places" exact component={Places} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
