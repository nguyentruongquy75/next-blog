import React, { useRef, useEffect } from "react";

import styles from "./Overlay.module.css";
export default function Overlay(props) {
  const overlayRef = useRef();

  const clickOverlayHandler = () => {
    overlayRef.current.style.opacity = 0;

    setTimeout(() => {
      props.onClose();
    }, 50);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = null);
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={clickOverlayHandler}
      className={styles.overlay}
    ></div>
  );
}
