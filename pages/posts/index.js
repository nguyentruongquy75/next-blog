import React from "react";
import Head from "next/head";

import PostsPage from "../../components/pages/PostsPage";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Danh sách các thể loại bài viết tại Bug Creator</title>
        <meta
          name="description"
          content={`Tại Bug Creator có các thể loại nổi bật như HTML, CSS, Javascript, ReactJs,Framework JS`}
        />
        <meta
          name="keywords"
          content={`Thể loại, HTML, CSS, Javascript, ReactJs,Framework JS, lập trình, blog`}
        />
        <meta
          property="og:title"
          content={`Danh sách các thể loại bài viết tại Bug Creator`}
        />
        <meta
          property="og:description"
          content={`Tại Bug Creator có các thể loại nổi bật như HTML, CSS, Javascript, ReactJs,Framework JS`}
        />
      </Head>
      <PostsPage />
    </>
  );
}
