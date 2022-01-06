import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { gql } from "@apollo/client";
import client from "../../graphql/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Post from "../post/Post";

import styles from "./HomePage.module.css";
import PostSkeleton from "../postSkeleton/PostSkeleton";

const loadingSkeleton = [];
const skeletonNumber = 8;

for (let index = 0; index < skeletonNumber; index++) {
  loadingSkeleton.push(
    <PostSkeleton
      highlightColor="var(--color-skeleton-animation)"
      baseColor="var(--color-skeleton)"
      key={index}
    />
  );
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("initial");

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const { data } = await client.query({
          query: gql`
            query {
              posts {
                id
                title
                desc
                link
                thumbnail {
                  url
                }
                categories {
                  name
                  link
                }
                publishedAt
              }
            }
          `,
        });

        setLatestPosts(data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    fetchData();
  }, []);

  // scroll to top begin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={styles["home__section"]}>
        {fetchStatus === "finished" && (
          <h2 className="section__heading">Bài viết mới nhất</h2>
        )}
        {fetchStatus === "loading" && (
          <Skeleton
            baseColor="var(--color-skeleton)"
            highlightColor="var(--color-skeleton-animation)"
            className="loading__title"
          />
        )}
        {fetchStatus === "finished" && latestPosts.length === 0 && (
          <div className="message">Chưa có bài viết nào</div>
        )}

        <div className={styles["post__list"]}>
          {fetchStatus === "finished" &&
            latestPosts.map((post) => <Post key={post.id} post={post} />)}
          {fetchStatus === "loading" && loadingSkeleton}
        </div>
      </section>
    </>
  );
}
