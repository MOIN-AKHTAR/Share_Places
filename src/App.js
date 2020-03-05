import React from "react";
import User from "./Users/Pages/User";
import Navbar from "./Shares/Navbar/Navbar";
import Places from "./Places/Pages/Places";
import UpdatePlace from "./Places/Pages/UpdatePlace";
import NewPlace from "./Places/Pages/NewPlace";
import Auth from "./Users/Pages/Auth";
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
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/login" component={Auth} />
        <Route path="/new/place" component={NewPlace} />
        <Route path="/update/:uid/places" component={UpdatePlace} />
        <Route path="/:uid/places" component={Places} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
