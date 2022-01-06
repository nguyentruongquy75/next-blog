import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import StyledContent from "../styledContent/StyledContent";
import { gql } from "@apollo/client";
import client from "../../graphql/config";

import styles from "./AboutPage.module.css";
import TableOfContent from "../tableOfContent/TableOfContent";
export default function AboutPage() {
  const [fetchStatus, setFetchStatus] = useState("initial");
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const {
          data: { abouts },
        } = await client.query({
          query: gql`
            query {
              abouts {
                name
                facebook
                github
                email
                bio
                image {
                  url
                }
                content {
                  markdown
                }
              }
            }
          `,
        });

        setAbout(abouts[0]);
        console.log(abouts[0]);
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
        <title>Giới thiệu</title>
        <meta name="description" content="Đôi chút về Bug Creator" />
        <meta
          name="keywords"
          content="Bug Creator, Giới thiệu,Bug Creator Blog,Blog"
        />
        <meta property="og:title" content={`Giới thiệu`} />
        <meta property="og:description" content={`Đôi chút về Bug Creator`} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <article>
            {fetchStatus === "finished" && (
              <StyledContent>{about.content.markdown}</StyledContent>
            )}
          </article>
        </div>
        <aside className={styles.aside}>
          {fetchStatus === "finished" && <TableOfContent />}
        </aside>
      </div>
    </>
  );
}
