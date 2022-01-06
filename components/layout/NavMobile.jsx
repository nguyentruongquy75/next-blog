import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavMobile.module.css";
const NavMobile = React.forwardRef(function NavMobile(props, ref) {
  const router = useRouter();
  return (
    <nav ref={ref} className={styles.nav}>
      <ul onClick={props.onClick}>
        <li>
          <Link href="/" className={router.asPath === "/" ? styles.active : ""}>
            <a>
              <i className="fas fa-home"></i>
              Home
            </a>
          </Link>
        </li>

        <li>
          <Link
            href="/posts"
            className={router.asPath === "/posts" ? styles.active : ""}
          >
            <a>
              <i className="far fa-newspaper"></i>
              Posts
            </a>
          </Link>
        </li>

        <li>
          <Link
            href="/useful"
            className={router.asPath === "/useful" ? styles.active : ""}
          >
            <a>
              <i className="fas fa-file-alt"></i>
              Useful
            </a>
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className={router.asPath === "/about" ? styles.active : ""}
          >
            <a>
              <i className="fas fa-user"></i>
              About
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
});

export default NavMobile;
