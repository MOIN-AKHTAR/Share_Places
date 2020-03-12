import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;
function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const login = useCallback((Id, Token, TokeneExpiretionDate) => {
    //expirationDate Will Be Provided By UseEffect If LoggedIn User Refresh Page-
    setToken(Token);
    setUserId(Id);
    //getTime Will Provide Time In Millisecond And Then We Add (1000*60*60) Which Is Equal To 1hr
    //1hr will Be Our Token Expiration Time
    let expirationDate =
      TokeneExpiretionDate || new Date(new Date().getTime() + 5000);
    setExpirationDate(expirationDate);
    // Setting Id And Token Of User In Localstorage So If He/She Refresh So He/She Will Not Logout Automatically
    //toISOString() is an inbuilt function in JavaScript which is used to convert the given date object's contents
    //into a string  and can easily converted back to Date-
    localStorage.setItem(
      "userData",
      JSON.stringify({ Id, Token, Expire: expirationDate.toISOString() })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpirationDate(null);
    // Removing Token And Id Of User From Localstorage-
    localStorage.removeItem("userData");
  }, []);
  // If user hard refresh if he/she is login he/she will stay login because of below useEffect
  useEffect(() => {
    const Data = JSON.parse(localStorage.getItem("userData"));
    //new Date(Data.Expire) this will take toISOString Date And Convert It Into Date Properly-
    if (Data && Data.Token && new Date(Data.Expire) > new Date()) {
      login(Data.Id, Data.Token, new Date(Data.Expire));
    }
  }, [login]);

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [expirationDate, logout, token]);

  let Element;
  if (token) {
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
    <Appcontext.Provider
      value={{
        isLoggedin: !!token,
        token: token,
        loggedInUser: userId,
        login,
        logout
      }}
    >
      <Router>
        <Navbar />
        {Element}
      </Router>
    </Appcontext.Provider>
  );
}

export default App;
