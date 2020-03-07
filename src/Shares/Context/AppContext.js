import { createContext } from "react";

export const Appcontext = createContext({
  isLoggedin: false,
  loggedInUser: null,
  login: () => {},
  logout: () => {}
});
