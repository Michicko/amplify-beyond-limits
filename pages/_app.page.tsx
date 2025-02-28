import "../public/fonts/stylesheet.css";
import "../styles/styles.css";
import "../styles/responsive.css";
import type { AppProps } from "next/app";
// import theme from "../config/theme";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import NextTopLoader from "nextjs-toploader";
// import '../public/service-worker'

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import outputs from "@/amplify_outputs.json";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
Amplify.configure(outputs);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Head>
          <title>Beyond Limits FA</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <meta
            name="Beyond Limits Fa"
            content="The official website of Beyond Limits FA"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="Beyond Limits Fa"
            content="The official website of Beyond Limits FA"
          />
          <meta
            name="description"
            content="The official website of Beyond Limits FA"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/touch-icon-ipad-retina.png"
          />

          <link rel="icon" type="image/png" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <NextTopLoader color="#ffd700" height={4} />
        {/*{getLayout(<Component {...pageProps} />)}*/}
        {Component.getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <GuestLayout>
            <Component {...pageProps} />
          </GuestLayout>
        )}
      </div>
    </Provider>
  );
}
