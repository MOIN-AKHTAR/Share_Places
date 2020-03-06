import React, { useState, useCallback } from "react";
import User from "./Users/Pages/User";
import Navbar from "./Shares/Navbar/Navbar";
import Places from "./Places/Pages/Places";
import UpdatePlace from "./Places/Pages/UpdatePlace";
import NewPlace from "./Places/Pages/NewPlace";
import Auth from "./Users/Pages/Auth";
import { Appcontext } from "./Shares/Context/AppContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.css";

function App() {
  const [isLoggedin, setIsLogIn] = useState(true);
  const login = useCallback(() => {
    setIsLogIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLogIn(false);
  }, []);
  let Element;
  if (isLoggedin) {
    Element = (
      <Switch>
        <Route path="/update/:uid/places" component={UpdatePlace} />
        <Route path="/new/place" component={NewPlace} />
        <Route path="/:uid/places" exact component={Places} />

        <Redirect to="/new/place" />
      </Switch>
    );
  } else {
    Element = (
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/login" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Appcontext.Provider value={{ isLoggedin, login, logout }}>
      <Router>
        <Navbar />
        {Element}
      </Router>
    </Appcontext.Provider>
  );
}

export default App;
