import { createContext } from "react";

const themeContext = createContext({
  theme: "light",
  setTheme(theme) {},
});

export default themeContext;
