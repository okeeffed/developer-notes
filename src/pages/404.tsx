import { Box, Container, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";

export default function Custom404Page() {
  return (
    <Box py={16}>
      <Head>
        <title>{`Dennis O'Keeffe's Blog | 404 Page Not Found`}</title>
        <meta
          name="description"
          content="A personal blog on all things of interest."
        />
        <meta property="og:title" content="404 Page Not Found" key="title" />
        <meta
          property="og:url"
          content={`https://blog.dennisokeeffe.com`}
          key="url"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A personal blog on all things of interest."
        />
        <meta name="twitter:title" content="404 Page Not Found" />
        <meta
          property="twitter:description"
          content="A personal blog on all things of interest."
        />
        <meta
          property="twitter:url"
          content={`https://blog.dennisokeeffe.com/`}
          key="twitter-url"
        />
        <meta
          property="og:image"
          content="https://cdn.dennisokeeffe.com/assets/den-dribbles-og-1.png"
        />
        <meta
          property="twitter:image"
          content="https://cdn.dennisokeeffe.com/assets/den-dribbles-og-1.png"
        />
      </Head>
      <Container maxW="6xl">
        <VStack align="stretch" spacing={8}>
          <Heading size="3xl">404 Page Not Found</Heading>
          <Text fontSize="xl">
            This is not grapes. Positive vibes though, friend.
          </Text>
          <Text fontSize="xl">
            Click here to{" "}
            <NextLink href="/" passHref>
              <Link fontWeight="bold" color="blue.600">
                {`go home`}
              </Link>
            </NextLink>
            .
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
