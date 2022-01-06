import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Post from "../post/Post";
import { gql } from "@apollo/client";
import client from "../../graphql/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./UsefulPage.module.css";
import PostSkeleton from "../postSkeleton/PostSkeleton";

const loadingSkeleton = [];
const skeletonNumber = 4;

for (let index = 0; index < skeletonNumber; index++) {
  loadingSkeleton.push(<PostSkeleton key={index} />);
}
export default function UsefulPage() {
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { categories },
        } = await client.query({
          query: gql`
            query {
              categories(where: { link: "useful" }) {
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
            }
          `,
        });

        setPosts(categories[0].posts);
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
      <Helmet>
        <title>Hữu ích</title>
        <meta
          name="description"
          content={`Tại đây tôi sẽ cung cấp cho bạn những chia sẻ, kiến thức hữu ích về lập trình`}
        />
        <meta
          name="keywords"
          content={`Hữu ích, chia sẻ, kiến thức, lập trình, blog`}
        />
        <meta property="og:title" content={`Hữu ích`} />
        <meta
          property="og:description"
          content={`Tại đây tôi sẽ cung cấp cho bạn những chia sẻ, kiến thức hữu ích về lập trình`}
        />
      </Helmet>
      <div className={styles.container}>
        <section>
          {fetchStatus === "finished" && <h2>Useful</h2>}

          {fetchStatus === "finished" && posts.length === 0 && (
            <div className="message">Chưa có bài viết nào</div>
          )}

          {fetchStatus === "loading" && (
            <Skeleton
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-animation)"
              className="loading__title"
            />
          )}
          <div className={styles["post__list"]}>
            {fetchStatus === "finished" &&
              posts.map((post) => <Post key={post.id} post={post} />)}

            {fetchStatus === "loading" && loadingSkeleton}
          </div>
        </section>
      </div>
    </>
  );
}
