import fs from "fs";
import path from "path";

import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  ListItem,
  OrderedList,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Adsense } from "@components/Adsense";
import { PackageSearch } from "@components/PackageSearch";
import { Sidebar } from "@components/Sidebar";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import kebabCase from "lodash/kebabCase";
import { TokensList } from "marked";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
// import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Waypoint } from "react-waypoint";
// import recursive from "recursive-readdir";
// import unwrapImages from "remark-unwrap-images";

import { DarkModeToggle } from "../../components/DarkModeToggle";
import { useSelectedImage } from "../../hooks/useSelectedImage";
import { logEvent } from "../../utils/amplitude/amplitude";
import DOKIcon from "../icons/dok.png";

const CodeBlock = dynamic(() =>
  import("../../components/CodeBlock").then((mod) => mod.CodeBlock)
);

// @ts-expect-error: props required
const CodeBlockTabs = dynamic(() =>
  import("../../components/CodeBlockTabs").then((mod) => mod.CodeBlockTabs)
);

// @ts-expect-error: props required
const SimpleQuiz = dynamic(() =>
  import("../../components/SimpleQuiz").then((mod) => mod.SimpleQuiz)
);
const BlockMath = dynamic(() => import("../../components/BlockMath/BlockMath"));
const ImageModal = dynamic(() =>
  import("src/components/ImageModal/ImageModal").then((mod) => mod.ImageModal)
);

function defineSrc(src: string) {
  return src.replace("..", "");
}

function getLanguage(className: string) {
  switch (className) {
    case "language-s":
    case "language-bash":
    case "language-shell":
      return "language-shell";
    default:
      return className;
  }
}

type Post = {
  title: string;
  description: string;
  href: string;
  readingTime: string;
  tags: string[];
  date: string;
  media: string;
};

type HTMLProps = React.HTMLAttributes<HTMLElement> & {
  // used for MathBlock
  title?: string;
};
const components: Record<string, React.FC<HTMLProps>> = {
  h1: (props) => <Heading fontWeight="bold" size="3xl" mb={8} {...props} />,
  h2: (props) => {
    const id = kebabCase(props.children as string);
    return (
      <Heading
        fontWeight="bold"
        id={id}
        size="2xl"
        lineHeight="normal"
        mb={8}
        {...props}
      />
    );
  },
  h3: (props) => <Heading fontWeight="bold" size="xl" mb={8} {...props} />,
  p: (props) => (
    <Text fontSize={["lg", "xl"]} mb={8} lineHeight="tall" {...props} />
  ),
  img: (props) => {
    //
    const { onOpen, setImage } = useSelectedImage((state: any) => ({
      onOpen: state.onOpen,
      setImage: state.setImage,
    }));

    // @ts-expect-error: src added on
    const src = defineSrc(props.src);
    return (
      <VStack
        justifyContent="center"
        _hover={{
          cursor: {
            sm: "initial",
            md: "pointer",
          },
        }}
        onClick={() => {
          setImage(src);
          onOpen();
        }}
        mb={8}
      >
        {/* @ts-expect-error: image props forced */}
        <NextImage
          {...props}
          src={src}
          objectFit="contain"
          width="1000px"
          height="600px"
          quality={72}
        />
        <Text fontSize="md" fontStyle="italic">
          {/* @ts-expect-error: alt props forced */}
          {props.alt}
        </Text>
      </VStack>
    );
  },
  a: ({ children, ...rest }) => (
    <Link
      color={useColorModeValue("blue.600", "blue.300")}
      fontWeight="bold"
      rel="noreferrer noopener"
      target="_blank"
      textDecoration="none"
      borderBottomWidth="6px"
      borderBottomColor={useColorModeValue("blue.100", "blue.600")}
      _hover={{
        borderBottomColor: useColorModeValue("blue.300", "blue.400"),
        color: useColorModeValue("blue.900", "blue.100"),
      }}
      _focus={{
        borderBottomColor: useColorModeValue("blue.300", "blue.400"),
        color: useColorModeValue("blue.900", "blue.100"),
      }}
      {...rest}
    >
      {children}
      <Icon mb={1} ml={1}>
        <ExternalLinkIcon />
      </Icon>
    </Link>
  ),
  code: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [displayCode, setDisplayCode] = React.useState(false);
    return (
      <div>
        <Waypoint onEnter={() => setDisplayCode(true)} topOffset="-400px" />
        <CodeBlock
          {...props}
          // @ts-expect-error: className added on
          className={getLanguage(props.className)}
          displayCode={displayCode}
        />
      </div>
    );
  },
  ul: (props) => (
    <Box px={6} mb={8}>
      <UnorderedList spacing={2} {...props} />
    </Box>
  ),
  li: (props) => <ListItem {...props} fontSize="xl" mb={4} />,
  ol: (props) => (
    <Box px={6} mb={8}>
      <OrderedList spacing={2} {...props} />
    </Box>
  ),
  blockquote: (props) => (
    <Box my={12} paddingLeft={4} borderLeftWidth={4} borderLeftColor="gray">
      <Text as="blockquote" fontStyle="italic" color="gray">
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child as React.ReactElement<any, string>, {
            py: 2,
            fontSize: "2xl",
          })
        )}
      </Text>
    </Box>
  ),
  table: (props) => <Table overflow="hidden" mb={8} {...props} />,
  tbody: (props) => <Tbody {...props} />,
  td: (props) => <Td {...props} />,
  tr: (props) => <Tr {...props} />,
  th: (props) => <Th bgColor="gray.100" {...props} />,
  thead: (props) => <Thead {...props} />,
  tfoot: (props) => <Tfoot {...props} />,
  BlockMath: ({ title = "Math block", ...props }) => (
    <BlockMath title={title} {...props} />
  ),
  CodeBlockTabs: (props) => <CodeBlockTabs {...props} />,
  SimpleQuiz: (props) => <SimpleQuiz {...props} />,
};

components.h1.displayName = "h1";
components.h2.displayName = "h2";
components.h3.displayName = "h3";
components.p.displayName = "p";
components.img.displayName = "img";
components.a.displayName = "a";
components.code.displayName = "code";
components.ul.displayName = "ul";
components.li.displayName = "li";
components.ol.displayName = "ol";
components.blockquote.displayName = "blockquote";
components.table.displayName = "table";
components.tbody.displayName = "tbody";
components.td.displayName = "td";
components.tr.displayName = "tr";
components.th.displayName = "th";
components.thead.displayName = "thead";
components.tfoot.displayName = "tfoot";
components.BlockMath.displayName = "BlockMath";
components.CodeBlockTabs.displayName = "CodeBlockTabs";
components.SimpleQuiz.displayName = "SimpleQuiz";

type FrontMatter = {
  title: string;
  tags: string;
  image: string;
  description: string;
  published?: boolean;
};

interface IBlog {
  source: string;
  frontMatter: FrontMatter;
  headings: string[];
  mdxFile: string;
  version: string;
  lastUpdated: string;
  recommendations: Post[];
  componentNames: string[];
}

export default function Blog({
  source,
  frontMatter: { title, tags, image, description, published },
  headings,
  mdxFile,
  componentNames,
}: IBlog) {
  const { push } = useRouter();
  const { src, isOpen, onClose } = useSelectedImage((state: any) => ({
    src: state.src,
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));
  const isModalDisplayed = useBreakpointValue({ md: true, sm: false });
  const allComponents = {
    ...components,
    BlockMath: componentNames.includes("BlockMath")
      ? components.BlockMath
      : null,
  };

  React.useEffect(() => {
    if (published === false) {
      void push("/");
    }
  }, [push, published]);

  React.useEffect(() => {
    void logEvent("Blog post viewed", {
      title,
      tags,
    });
  }, [title, tags]);

  const headerBgColor = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("blue", "blue.300");
  const repo = `https://github.com/okeeffed/developer-notes-nextjs/content/${mdxFile}`;

  return (
    <>
      <Head>
        <title>{`${title} | Dennis O'Keeffe Notes`}</title>
        <meta name="description" content={description} key="description"></meta>
        <link
          rel="canonical"
          href={`https://docs.dennisokeeffe.com/${mdxFile}`}
        ></link>
        <meta property="og:title" content={title} key="title"></meta>
        <meta
          property="og:url"
          content={`https://docs.dennisokeeffe.com/${mdxFile}`}
          key="url"
        ></meta>
        <meta property="og:type" content="website" key="og:type"></meta>
        <meta
          property="og:description"
          content={description}
          key="og:description"
        ></meta>
        <meta property="og:image" content={image} key="og:image"></meta>
        <meta name="twitter:title" content={title} key="twitter:title"></meta>
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        ></meta>
        <meta
          name="twitter:url"
          content={`https://docs.dennisokeeffe.com/${mdxFile}`}
          key="twitter-url"
        ></meta>
        <meta name="twitter:image" content={image} key="twitter:image"></meta>
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        ></meta>
        <meta
          name="twitter:site"
          content="@dennisokeeffe92"
          key="twitter:site"
        ></meta>
        <meta
          name="twitter:creator"
          content="@dennisokeeffe92"
          key="twitter:creator"
        ></meta>
      </Head>
      <Box w="full" bgColor={headerBgColor} py={4} px={4}>
        <HStack p={2} spacing={2}>
          <NextLink href="/">
            <NextImage src={DOKIcon} height={60} width={60} />
          </NextLink>
          <Spacer />
          <Container maxW="4xl">
            <PackageSearch />
          </Container>
          <Spacer />
          <DarkModeToggle />
        </HStack>
      </Box>
      <Box py={8}>
        <Grid templateColumns="repeat(5, 1fr)" gap={12}>
          <GridItem
            colSpan={1}
            display={{
              sm: "none",
              md: "block",
            }}
          >
            <Sidebar />
          </GridItem>
          <GridItem
            colSpan={{
              sm: 5,
              md: 4,
              lg: 3,
            }}
          >
            <VStack align="stretch" spacing={8}>
              {image && (
                <NextImage
                  alt={`${title} main image`}
                  src={image}
                  width="736px"
                  height="442px"
                  quality={72}
                  priority
                  placeholder={
                    process.env.NODE_ENV === "production" ? "blur" : "empty"
                  }
                />
              )}
              <Adsense />

              <div className="wrapper">
                {/* @ts-expect-error: untyped MDXRemote file */}
                <MDXRemote {...source} components={allComponents} lazy />
              </div>
            </VStack>
          </GridItem>
          <GridItem
            colSpan={1}
            display={{
              sm: "none",
              md: "none",
              lg: "block",
            }}
          >
            <VStack pt={0} spacing={4} alignItems="flex-start">
              <Heading as="h2" fontSize="lg">
                Repository
              </Heading>
              <NextLink href={repo} passHref>
                <Link
                  variant="ghost"
                  color={linkColor}
                  isExternal
                  target="_blank"
                >
                  {repo}
                </Link>
              </NextLink>
              <Divider />
              <Heading as="h2" fontSize="lg">
                Sections
              </Heading>
              {headings.map((heading) => (
                <Box key={heading}>
                  <NextLink href={`#${kebabCase(heading)}`} passHref>
                    <Link variant="ghost" color={linkColor}>
                      {heading}
                    </Link>
                  </NextLink>
                </Box>
              ))}
              <Divider />
              <Adsense />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
      {isModalDisplayed && (
        <ImageModal
          // @ts-expect-error: dynamic import
          src={src}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

type Matter = {
  content: string;
  data: Record<string, unknown>;
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { mdxFile: arg, category },
  } = context;

  const fileArgs = [category, ...arg];

  const mdxFile = fileArgs.join("/");
  const relativePath = "./public/content/";

  const fileContents = fs.readFileSync(
    path.resolve(process.cwd(), relativePath, `${mdxFile}.mdx`),
    "utf-8"
  );

  const matter = await import("gray-matter").then((mod) => mod.default);
  const { content, data } = matter(fileContents) as Matter;

  const serialize = await import("next-mdx-remote/serialize").then(
    (mod) => mod.serialize
  );
  const unwrapImages = await import("remark-unwrap-images").then(
    (mod) => mod.default
  );
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      // @ts-expect-error: VFile type error
      remarkPlugins: [unwrapImages],
    },
  });

  const marked = await import("marked").then((mod) => mod.default);
  const tokens: TokensList = marked.lexer(content);
  const headings = tokens
    .filter((token) => token.type === "heading" && token.depth === 2)
    // @ts-expect-error: text does exist
    .map((token) => token.text as string);

  const componentNames = [
    /<BlockMath/.test(content) ? "BlockMath" : null,
    /<CodeBlockTabs/.test(content) ? "CodeBlockTabs" : null,
    /<SimpleQuiz/.test(content) ? "SimpleQuiz" : null,
  ].filter(Boolean);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      componentNames,
      headings,
      mdxFile,
      recommendations: [] as Post[],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recursive = await import("recursive-readdir").then(
    (module) => module.default
  );

  const files = await recursive(
    path.resolve(process.cwd(), "./public/content")
  );
  const pkgs = files.map((file) => {
    const relativeFile = file
      .replace(`${process.cwd()}/public/content/`, "")
      .replace(".mdx", "");

    return {
      mdxFile: relativeFile,
    };
  });

  const paths = pkgs.map(({ mdxFile }) => {
    return {
      params: {
        mdxFile: mdxFile.split("/"),
      },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};
