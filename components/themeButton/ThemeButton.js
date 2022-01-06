import React, { useContext, useEffect } from "react";

import themeContext from "../../context/themeContext";

import SunImage from "../../assets/img/sun.png";
import MoonImage from "../../assets/img/moon.png";

import styles from "./ThemeButton.module.css";

let isInitial = true;
export default function ThemeButton() {
  const context = useContext(themeContext);

  const switchTheme = () =>
    context.setTheme((theme) => {
      if (theme === "light") {
        return "dark";
      } else if (theme === "dark") {
        return "light";
      }
    });

  // switch css
  useEffect(() => {
    if (isInitial) {
      document.body.className = localStorage.getItem("theme") || context.theme;
      context.setTheme(localStorage.getItem("theme") || context.theme);
      isInitial = false;
    }
    document.body.className = context.theme;
    localStorage.setItem("theme", context.theme);
  }, [context.theme]);

  return (
    <div className={styles["container"]}>
      {context.theme === "dark" && (
        <div onClick={switchTheme} className={`${styles.button}`}>
          <img src={SunImage.src} alt="Sun Icon" />
        </div>
      )}
      {context.theme === "light" && (
        <div onClick={switchTheme} className={`${styles.button}`}>
          <img src={MoonImage.src} alt="Moon Icon" />
        </div>
      )}
    </div>
  );
}
