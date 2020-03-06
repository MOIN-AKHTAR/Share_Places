import { createContext } from "react";

export const Appcontext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {}
});
