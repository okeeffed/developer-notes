import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

import data from "../../data/_sidebar.json";

type DirectoryData = {
  title: string;
  files: {
    title: string;
    href: string;
  }[];
  dirs: DirectoryData[];
};

interface DirectoryPanelProps {
  panelData: DirectoryData;
  borderStyle?: "solid" | "none";
  py?: number;
}

function DirectoryPanel({
  panelData,
  borderStyle,
  py = 4,
}: DirectoryPanelProps) {
  const color = useColorModeValue("blue", "blue.300");

  return (
    <>
      {panelData.files?.map(({ title, href }) => {
        return (
          <Box key={title} ml={4} py={py}>
            <NextLink href={href} passHref>
              <Link color={color}>{title}</Link>
            </NextLink>
          </Box>
        );
      })}
      {panelData.dirs?.map((data) => (
        <AccordionItem key={data.title} border={borderStyle} py={0}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {data.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pl={4} py={0} pr={0}>
            <DirectoryPanel
              key={data.title}
              panelData={data}
              borderStyle="none"
              py={2}
            />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </>
  );
}

export function Sidebar() {
  return (
    <Accordion allowMultiple allowToggle reduceMotion>
      <DirectoryPanel panelData={data.sidebar} />
    </Accordion>
  );
}
