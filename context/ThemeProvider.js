import React, { useState } from "react";
import themeContext from "./themeContext";

export default function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </themeContext.Provider>
  );
}
