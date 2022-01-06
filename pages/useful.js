import React from "react";
import Head from "next/head";
import UsefulPage from "../components/pages/UsefulPage";

export default function Useful() {
  return (
    <>
      <Head>
        <title>Bài viết hữu ích</title>
        <meta
          name="description"
          content="Nơi cung cấp những kiến thức hay, hữu ích về các ngôn ngữ lập trình, mẹo hay đời thường"
        />
        <meta
          name="keywords"
          content="Bug Creator,Useful, Bug Blog,Bug Creator Blog,Blog"
        />
        <meta property="og:title" content={`Hữu ích`} />
        <meta
          property="og:description"
          content={`Nơi cung cấp những kiến thức hay, hữu ích về các ngôn ngữ lập trình, mẹo hay đời thường`}
        />
      </Head>
      <UsefulPage />
    </>
  );
}
