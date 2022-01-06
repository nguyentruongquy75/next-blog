import React, { useEffect, useState } from "react";

import styles from "./TableOfContent.module.css";
export default function TableOfContent() {
  const [content, setContent] = useState([]);

  const scrollToElement = (e) => {
    document
      .querySelector(`[data-content='${e.target.dataset.content}']`)
      .scrollIntoView();
  };

  // get data
  useEffect(() => {
    const content = [];
    const articleEle = document.querySelector("article");

    const h2h3Elements = articleEle.querySelectorAll("h2,h3");

    Array.from(h2h3Elements).forEach((element) => {
      // set id
      element.id = element.textContent.split(" ").join("-");
      element.setAttribute("data-content", element.textContent);
      // set content
      content.push({
        tag: element.localName,
        content: element.textContent,
      });
    });

    setContent(content);
  }, []);

  // listen
  useEffect(() => {
    const handle = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const linkElement = document.querySelector(
            `a[data-content='${entry.target.textContent}']`
          );

          // remove before active
          document.querySelector(`.${styles["active"]}`) &&
            document
              .querySelector(`.${styles["active"]}`)
              .classList.remove(styles.active);

          // add class
          linkElement.classList.add(styles["active"]);
        }
      });
    };
    const articleEle = document.querySelector("article");
    const h2h3Elements = articleEle.querySelectorAll("h2,h3");
    const observer = new IntersectionObserver(handle, {
      root: null,
      threshold: 1,
    });
    [...h2h3Elements].forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>TABLE OF CONTENTS</h2>
      <ul>
        {content.map((item) => (
          <li key={item.content} className={styles[item.tag]}>
            <a
              onClick={scrollToElement}
              data-content={item.content}
              href={`#${item.content.split(" ").join("-")}`}
            >
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
