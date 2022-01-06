import React, { useEffect, useRef, useState } from "react";

import { gql } from "@apollo/client";
import client from "../../graphql/config";
import styles from "./Search.module.css";
import Link from "next/link";

import SpinIcon from "../../assets/img/spin.gif";

export default function Search() {
  const containerRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isDisplayResult, setIsDisplayResult] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("initial");

  const changeSearchValueHandler = (e) => setSearchValue(e.target.value);

  const focusInputHandler = (e) => {
    containerRef.current.classList.add(styles["focus"]);
  };

  const blurInputHandler = (e) => {
    containerRef.current.classList.remove(styles["focus"]);
  };

  const resetSearch = () => {
    setIsDisplayResult(false);
    setSearchValue("");
    setSearchResult([]);
  };

  const clickoutHandler = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsDisplayResult(false);
    }
  };

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

  // check empty search value
  useEffect(() => {
    if (searchValue.trim().length === 0) {
      setIsDisplayResult(false);
    } else {
      setIsDisplayResult(true);
    }
  }, [searchValue]);

  // click out
  useEffect(() => {
    if (isDisplayResult) {
      document.addEventListener("mousedown", clickoutHandler);

      return () => document.removeEventListener("mousedown", clickoutHandler);
    }
  }, [isDisplayResult]);

  return (
    <div ref={containerRef} className={styles["search__container"]}>
      <div className={styles["search__icon"]}>
        <i className="fas fa-search"></i>
      </div>
      <div className={styles["search__input"]}>
        <input
          onChange={changeSearchValueHandler}
          onFocus={focusInputHandler}
          onBlur={blurInputHandler}
          value={searchValue}
          type="text"
          placeholder="Tìm kiếm bài viết"
        />
      </div>

      {isDisplayResult && (
        <div className={styles["result"]}>
          <div className={styles["result__header"]}>
            {fetchStatus === "loading" && (
              <img src={SpinIcon.src} alt="spinner" />
            )}
            {fetchStatus === "finished" && <i class="fas fa-search"></i>}
            <span>
              {fetchStatus === "finished" ? "Kết quả cho " : "Tìm "}'
              {searchValue}'
            </span>
          </div>
          {searchResult.length > 0 && (
            <div className={styles["result__list"]}>
              <ul>
                {searchResult.slice(0, 10).map((result) => (
                  <li>
                    <Link onClick={resetSearch} href={`/post/${result.link}`}>
                      <a className={styles["result__item"]}>
                        <img src={result.thumbnail.url} alt={result.title} />
                        <span>{result.title}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
