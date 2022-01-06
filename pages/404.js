import React from "react";
import Head from "next/head";

import ErrorPage from "../components/pages/ErrorPage";

export default function Error() {
  return (
    <>
      <Head>
        <title>Có lỗi</title>
      </Head>
      <ErrorPage />
    </>
  );
}
