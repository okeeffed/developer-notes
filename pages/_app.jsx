import { DokzProvider, GithubLink, ColorModeSwitch } from 'dokz'
import React from 'react'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

export default function App(props) {
    const { Component, pageProps } = props
    return (
        <ChakraProvider resetCSS>
            <Head>
                <link
                    href='https://fonts.googleapis.com/css?family=Fira+Code'
                    rel='stylesheet'
                    key='google-font-Fira'
                />
            </Head>
            <DokzProvider
                headerItems={[
                    <GithubLink
                        key='0'
                        url='https://github.com/okeeffed/developer-notes'
                    />,
                    <ColorModeSwitch key='1' />,
                ]}
                headerLogo={
                    <img
                        src='/dok-icon.png'
                        height='50px'
                        width="50px"
                    />
                }
                sidebarOrdering={{
                    'index.mdx': true,
                    Documents_Group: {
                        'another.mdx': true,
                    },
                }}
            >
                <Component {...pageProps} />
            </DokzProvider>
        </ChakraProvider>
    )
}
