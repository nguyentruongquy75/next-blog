import React, { useState, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import client from "../../graphql/config";

import Link from "next/link";

import styles from "./SearchMobile.module.css";
export default function SearchMobile(props) {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("initial");

  const changeInputHandler = (e) =>
    setSearchValue(inputRef.current.textContent);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { posts },
        } = await client.query({
          query: gql`
            query {
              posts(where: {title_contains : "${searchValue}"}) {
                id
                title
                publishedAt
                link
                thumbnail {
                  url
                }
              }
            }
          `,
        });

        setSearchResult(posts);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    if (searchValue.trim()) {
      const timeoutId = setTimeout(() => {
        fetchData();
      }, 400);

      return () => clearTimeout(timeoutId);
    }
  }, [searchValue]);

  // css for input
  useEffect(() => {
    if (searchValue === "") {
      inputRef.current.classList.add(styles.placeholder);
      inputRef.current.style.fontSize = "4rem";
    } else {
      inputRef.current.classList.remove(styles.placeholder);
      inputRef.current.style.fontSize = "3.2rem";
    }
  }, [searchValue]);

  // overflow body
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = null);
  }, []);

  return (
    <div className={styles["search__mobile"]}>
      <div onClick={props.onClose} className={styles["close"]}>
        <i className="fas fa-times"></i>
      </div>
      <div
        ref={inputRef}
        className={styles["search__input"]}
        contentEditable
        onInput={changeInputHandler}
      ></div>
      <div className={styles["result__list"]}>
        <div>
          {fetchStatus === "finished" &&
            searchResult.slice(0, 4).map((result) => (
              <Link key={result.link} href={`/post/${result.link}`}>
                <a onClick={props.onClose} className={styles["result__item"]}>
                  <img src={result.thumbnail.url} alt={result.title} />
                  <span>{result.title}</span>
                </a>
              </Link>
            ))}

          {fetchStatus === "finished" && searchResult.length === 0 && (
            <div className="message">Không có kết quả nào</div>
          )}
        </div>
      </div>
    </div>
  );
}
