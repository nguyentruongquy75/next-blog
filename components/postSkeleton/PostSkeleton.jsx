import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./PostSkeleton.module.css";
export default function PostSkeleton() {
  return (
    <div className={styles.loading}>
      <div>
        <Skeleton
          baseColor="var(--color-skeleton)"
          highlightColor="var(--color-skeleton-animation)"
          className={styles["loading__image"]}
        />
      </div>
      <div>
        <Skeleton
          baseColor="var(--color-skeleton)"
          highlightColor="var(--color-skeleton-animation)"
        />
      </div>
      <div>
        <Skeleton
          baseColor="var(--color-skeleton)"
          highlightColor="var(--color-skeleton-animation)"
        />
      </div>
    </div>
  );
}
