import React, { useRef, useState } from "react";
import Link from "next/link";

import Avatar from "../../assets/img/AvatarMaker.png";
import Overlay from "../overlay/Overlay";
import Search from "../search/Search";
import SearchMobile from "../search/SearchMobile";
import ThemeButton from "../themeButton/ThemeButton";

import styles from "./Header.module.css";
import NavMobile from "./NavMobile";

export default function Header() {
  const navMobileRef = useRef();

  const [isDisplaySearchMobile, setIsDisplaySearchMobile] = useState(false);
  const [isDisplayMenuMobile, setIsDisplayMenuMobile] = useState(false);

  // search mobile
  const displaySearchMobile = () => setIsDisplaySearchMobile(true);
  const hideSearchMobile = () => setIsDisplaySearchMobile(false);

  // menu mobile
  const displayMenuMobile = () => setIsDisplayMenuMobile(true);
  const hideMenuMobile = () => {
    Object.assign(navMobileRef.current.style, {
      transform: "translateX(-100%)",
      opacity: 0,
    });

    setTimeout(() => {
      setIsDisplayMenuMobile(false);
    }, 185);
  };
  const closeMenuMobile = () => setIsDisplayMenuMobile(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__logo"]}>
          <Link href={"/"} replace>
            <div className={styles.logo}>
              <img src={Avatar.src} alt="Logo Icon" />
            </div>
          </Link>
          <h4 className={styles.name}>Bug Creator</h4>
        </div>
        <div onClick={displayMenuMobile} className={styles["menu__mobile"]}>
          <i className="fas fa-bars"></i>
        </div>
        <div className={styles["search"]}>
          <Search />
        </div>
        <div className={styles["header__right"]}>
          <div
            onClick={displaySearchMobile}
            className={styles["search__mobile"]}
          >
            <i className="fas fa-search"></i>
          </div>
          <ThemeButton />
        </div>
      </header>
      {isDisplaySearchMobile && <SearchMobile onClose={hideSearchMobile} />}
      {isDisplayMenuMobile && (
        <NavMobile onClick={closeMenuMobile} ref={navMobileRef} />
      )}
      {isDisplayMenuMobile && <Overlay onClose={hideMenuMobile} />}
    </>
  );
}
