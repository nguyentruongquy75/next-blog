import React from "react";
import Head from "next/head";

import AboutPage from "../components/pages/AboutPage";

export default function About() {
  return (
    <>
      <Head>
        <title>Giới thiệu</title>
        <meta name="description" content="Đôi chút về Bug Creator" />
        <meta
          name="keywords"
          content="Bug Creator,Useful, Bug Blog,Bug Creator Blog,Blog"
        />
        <meta property="og:title" content={`Giới thiệu`} />
        <meta property="og:description" content={`Đôi chút về Bug Creator`} />
      </Head>
      <AboutPage />
    </>
  );
}
