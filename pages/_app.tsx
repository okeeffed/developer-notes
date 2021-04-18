import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeSwitch, DokzProvider, GithubLink } from "dokz"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props
  return (
    <ChakraProvider resetCSS>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Code"
          rel="stylesheet"
          key="google-font-Fira"
        />
      </Head>
      <DokzProvider
        headerItems={[
          <GithubLink
            key="0"
            url="https://github.com/okeeffed/developer-notes"
          />,
          <ColorModeSwitch key="1" />,
        ]}
        headerLogo={<img src="/dok-icon.png" height="50px" width="50px" />}
        sidebarOrdering={{
          "index.mdx": true,
          Documents_Group: {
            "another.mdx": true,
          },
        }}
      >
        <Component {...pageProps} />
      </DokzProvider>
    </ChakraProvider>
  )
}
