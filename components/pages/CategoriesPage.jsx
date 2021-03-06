import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import Post from "../post/Post";
import { gql } from "@apollo/client";
import client from "../../graphql/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./CategoriesPage.module.css";
import PostSkeleton from "../postSkeleton/PostSkeleton";

const loadingSkeleton = [];
const skeletonNumber = 4;

for (let index = 0; index < skeletonNumber; index++) {
  loadingSkeleton.push(<PostSkeleton key={index} />);
}
export default function UsefulPage() {
  const router = useRouter();
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { categories },
        } = await client.query({
          query: gql`
            query {
              categories(where: { link: "${router.query.slug}" }) {
                name
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
        setCategoryName(categories[0].name);

        console.log(categories[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("finished");
      }
    };

    fetchData();
  }, [router.query.slug]);

  // scroll to top begin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>{categoryName}</title>
        <meta
          name="description"
          content={`T???i ????y t??i s??? cung c???p cho b???n nh???ng chia s???, ki???n th???c h???u ??ch v??? l???p tr??nh`}
        />
        <meta
          name="keywords"
          content={`H???u ??ch, chia s???, ki???n th???c, l???p tr??nh, blog`}
        />
        <meta property="og:title" content={`H???u ??ch`} />
        <meta
          property="og:description"
          content={`T???i ????y t??i s??? cung c???p cho b???n nh???ng chia s???, ki???n th???c h???u ??ch v??? l???p tr??nh`}
        />
      </Head>
      <div className={styles.container}>
        <section>
          {fetchStatus === "finished" && <h2>{categoryName}</h2>}

          {fetchStatus === "finished" && posts.length === 0 && (
            <div className="message">Ch??a c?? b??i vi???t n??o</div>
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
