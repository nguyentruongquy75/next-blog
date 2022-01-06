import Head from "next/head";

import HomePage from "../components/pages/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta
          name="description"
          content="Blog chia sẻ kiến thức về lập trình và cuộc sống"
        />
        <meta
          name="keywords"
          content="Bug Creator, Bug Blog,Bug Creator Blog,Blog"
        />
        <meta property="og:title" content={`Trang chủ`} />
        <meta
          property="og:description"
          content={`Blog chia sẻ kiến thức về lập trình và cuộc sống`}
        />
      </Head>
      <HomePage />
    </>
  );
}
