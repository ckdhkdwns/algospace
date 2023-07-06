import Loading from "@/components/public/loading";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import Head from "next/head";

const AnimationWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      // NProgress.start();
      setLoading(true);
    };
    const end = () => {
      // NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <Head>
        <title>AlgoSpace</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
