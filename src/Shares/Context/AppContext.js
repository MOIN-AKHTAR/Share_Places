import { createContext } from "react";

export const Appcontext = createContext({
  isLoggedin: false,
  loggedInUser: null,
  token: null,
  login: () => {},
  logout: () => {}
});
