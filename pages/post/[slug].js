import React from "react";

import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../graphql/config";

import PostDetailPage from "../../components/pages/PostDetailPage";

function Detail(props) {
  const postDetail = props.postDetail;

  return (
    <>
      <Head>
        <title>{postDetail.title}</title>
        <meta name="description" content={postDetail.desc} />
        <meta
          name="keywords"
          content={`${postDetail.categories[0].name}, ${postDetail.categories[0].link}, lập trình, blog`}
        />
        <meta property="og:title" content={postDetail.title} />
        <meta property="og:description" content={postDetail.desc} />
        <meta property="og:image" content={postDetail.thumbnail.url} />
      </Head>
      <PostDetailPage postDetail={postDetail} />
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const {
    data: { posts },
  } = await client.query({
    query: gql`
                    query {
                      posts(where: { link: "${slug}" }) {
                        id
                        title
                        desc
                        content {
                          markdown
                        }
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

  return {
    props: {
      postDetail: posts[0],
    },
  };
}

export default Detail;
