import React from "react";
import Link from "next/link";

import styles from "./Post.module.css";

export default function Post(props) {
  const post = props.post;
  return (
    <div className={styles.post}>
      <Link href={`/post/${post.link}`}>
        <a>
          <div
            className={styles["post__image"]}
            style={{
              background: `url(
            ${post.thumbnail.url}
          ) center/cover no-repeat`,
            }}
          ></div>
        </a>
      </Link>
      <div className={styles["post__info"]}>
        <Link href={`/post/${post.link}`}>
          <a>
            <span className={styles["post__name"]}>{post.title}</span>
          </a>
        </Link>
        <span className={styles["post__time"]}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
