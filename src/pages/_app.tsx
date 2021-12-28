import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { BuyMeACoffee } from "@components/BuyMeACoffee/BuyMeACoffee";
import * as React from "react";

import "../styles/code.css";

import type { AppProps } from "next/app";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <BuyMeACoffee />
      </ChakraProvider>
    </>
  );
}
