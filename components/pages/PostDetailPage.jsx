import React, { useEffect } from "react";

import TableOfContent from "../tableOfContent/TableOfContent";
import StyledContent from "../styledContent/StyledContent";
// import StyledMarkdown from "../styledMarkdown/StyledMarkdown";

import styles from "./PostDetailPage.module.css";
let scrollY = 0;

export default function PostDetailPage(props) {
  const postDetail = props.postDetail;

  // css for header
  useEffect(() => {
    const header = document.querySelector("header");

    const handleScroll = (e) => {
      if (window.scrollY > scrollY) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = null;
      }

      scrollY = window.scrollY;
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      header.style.transform = null;
    };
  }, []);

  // scroll to top begin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["container"]}>
      <article className={styles.article}>
        <div className={styles["thumbnail"]}>
          <img src={postDetail.thumbnail.url} alt="" />
        </div>
        <h1 className={styles["title"]}>{postDetail.title}</h1>
        <StyledContent>{postDetail.content.markdown}</StyledContent>
      </article>

      <aside className={styles.aside}>
        <TableOfContent />
      </aside>
    </div>
  );
}
