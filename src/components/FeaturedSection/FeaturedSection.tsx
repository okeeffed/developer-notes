import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  useColorModeValue as mode,
  Spacer,
  Tag,
  Text,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsClockFill } from "react-icons/bs";

interface BlogProps {
  title: string;
  href: string;
  media?: string;
  description: string;
  readingTime: string;
  author?: {
    name: string;
    href: string;
  };
  tags?: string[];
  blurHash?: string;
  isPriority?: boolean;
  index?: number;
}

interface FeaturedSectionProps {
  posts: BlogProps[];
}

export const FeaturedSection = ({ posts }: FeaturedSectionProps) => {
  const isMobile = useBreakpointValue({ sm: true, md: false });

  const [featured, ...rest] = posts;

  if (isMobile) {
    return null;
  }

  return (
    <Grid
      h="540px"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={4} colSpan={2}>
        <LinkBox
          as="article"
          h="full"
          bg={{ sm: mode("white", "gray.700") }}
          shadow={{ sm: "base" }}
          rounded={{ sm: "md" }}
          overflow="hidden"
          transition="all 0.2s"
          _hover={{ shadow: { sm: "lg" } }}
        >
          <Box position="relative">
            <Box minHeight="360px">
              {featured.media && (
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt={featured.title}
                  src={featured.media}
                  quality={72}
                  priority
                  placeholder={
                    process.env.NODE_ENV === "production" ? "blur" : "empty"
                  }
                />
              )}
            </Box>
          </Box>
          <Flex direction="column" px={{ sm: "6" }} py="5" h="full">
            <Heading as="h3" size="sm" mb="2" lineHeight="base">
              <LinkOverlay href={featured.href}>{featured.title}</LinkOverlay>
            </Heading>
            {featured.tags && (
              <Box mb={4}>
                <Wrap shouldWrapChildren wrap="wrap">
                  {featured.tags.map((tag) => (
                    <Tag fontSize="xs" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Wrap>
              </Box>
            )}
            <Text noOfLines={1} mb="4" color={mode("gray.600", "gray.400")}>
              {featured.description}
            </Text>
            <Flex>
              <Spacer />
              <Text>
                <Box
                  as={BsClockFill}
                  display="inline-block"
                  me="2"
                  opacity={0.4}
                />
                {featured.readingTime}
              </Text>
            </Flex>
          </Flex>
        </LinkBox>
      </GridItem>
      {rest.map((post) => (
        <GridItem rowSpan={2} colSpan={1} key={post.title}>
          <LinkBox
            as="article"
            h="full"
            bg={{ sm: mode("white", "gray.700") }}
            shadow={{ sm: "base" }}
            rounded={{ sm: "md" }}
            overflow="hidden"
            transition="all 0.2s"
            _hover={{ shadow: { sm: "lg" } }}
          >
            <Box position="relative">
              <Box height="120px">
                {post.media && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    objectPosition="0 0"
                    alt={post.title}
                    src={post.media}
                    quality={50}
                    priority
                    sizes="342px"
                    placeholder={
                      process.env.NODE_ENV === "production" ? "blur" : "empty"
                    }
                  />
                )}
              </Box>
            </Box>
            <Flex direction="column" px={{ sm: "3" }} py="5" h="full">
              <Text noOfLines={3} mb="2" color={mode("gray.600", "gray.400")}>
                {post.description}
              </Text>
              <Flex>
                <Spacer />
                <Text>
                  <Box
                    as={BsClockFill}
                    display="inline-block"
                    me="2"
                    opacity={0.4}
                  />
                  {featured.readingTime}
                </Text>
              </Flex>
            </Flex>
          </LinkBox>
        </GridItem>
      ))}
    </Grid>
  );
};
