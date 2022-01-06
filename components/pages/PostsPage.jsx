import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { gql } from "@apollo/client";
import client from "../../graphql/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";

import Post from "../post/Post";
import Slider from "../slider/Slider";
import PostSkeleton from "../postSkeleton/PostSkeleton";

import styles from "./PostsPage.module.css";

const loadingSkeleton = [];
const skeletonNumber = 4;

for (let index = 0; index < skeletonNumber; index++) {
  loadingSkeleton.push(
    <PostSkeleton baseColor="var(--color-skeleton)" key={index} />
  );
}

export default function PostsPage() {
  const sliderOptions = {
    slidesToShow: 4,
    slidesToScroll: 2,
    space: 24,
    responsive: [
      {
        breakpoint: 1023,
        slidesToShow: 3,
        slidesToScroll: 2,
        space: 24,
      },
      {
        breakpoint: 767,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        space: 24,
      },
    ],
  };

  const [categories, setCategories] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("initial");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { categories },
        } = await client.query({
          query: gql`
            query {
              categories {
                id
                link
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

        setCategories(categories.filter((cate) => cate.link !== "useful"));
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
      <div className={styles["container"]}>
        {fetchStatus === "finished" &&
          categories.map((category) => (
            <section className={styles.section} key={category.id}>
              <h2 className="section__heading">
                <span>{category.name}</span>
                {sliderOptions.slidesToShow < category.posts.length && (
                  <Link
                    className={styles["section__expand"]}
                    href={`/posts/${category.link}`}
                  >
                    Xem tất cả <i className="fas fa-angle-right"></i>
                  </Link>
                )}
              </h2>
              {category.posts.length === 0 && (
                <div className="message">Chưa có bài viết nào</div>
              )}
              <div className={styles["section__list"]}>
                <Slider {...sliderOptions}>
                  {category.posts.map((post) => (
                    <div key={post.id}>
                      <Post post={post} />
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          ))}

        {fetchStatus === "loading" && (
          <>
            <section>
              <Skeleton
                baseColor="var(--color-skeleton)"
                className="loading__title"
              />

              <div className={styles["section__list"]}>
                <Slider {...sliderOptions}>{loadingSkeleton}</Slider>
              </div>
            </section>
            <section>
              <Skeleton
                baseColor="var(--color-skeleton)"
                className="loading__title"
              />

              <div className={styles["section__list"]}>
                <Slider {...sliderOptions}>{loadingSkeleton}</Slider>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
