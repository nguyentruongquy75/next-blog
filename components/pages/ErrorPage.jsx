import React from "react";

import Image from "../../assets/img/404.png";

import styles from "./ErrorPage.module.css";
export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles["error__image"]}>
        <img src={Image.src} alt="404" />
      </div>
      <p className={styles.message}>Đây không phải là lỗi. Đây là tính năng</p>
    </div>
  );
}
