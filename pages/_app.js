import "../styles/globals.css";

import MainLayout from "../components/layout/MainLayout";
import ThemeProvider from "../context/ThemeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
