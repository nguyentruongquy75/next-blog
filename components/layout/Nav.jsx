import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.css";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a className={router.asPath === "/" ? styles.active : ""}>
              <i className="fas fa-home"></i>
              Home
            </a>
          </Link>
        </li>

        <li>
          <Link href="/posts">
            <a className={router.asPath === "/posts" ? styles.active : ""}>
              <i className="far fa-newspaper"></i>
              Posts
            </a>
          </Link>
        </li>

        <li>
          <Link href="/useful">
            <a className={router.asPath === "/useful" ? styles.active : ""}>
              <i className="fas fa-file-alt"></i>
              Useful
            </a>
          </Link>
        </li>

        <li>
          <Link href="/about">
            <a className={router.asPath === "/about" ? styles.active : ""}>
              <i className="fas fa-user"></i>
              About
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
