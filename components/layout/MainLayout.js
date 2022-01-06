import React from "react";

import Header from "./Header";
import Nav from "./Nav";

import styles from "./MainLayout.module.css";
import Footer from "./Footer";
export default function MainLayout(props) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Nav />
        {props.children}
      </main>
      <Footer />
    </>
  );
}
