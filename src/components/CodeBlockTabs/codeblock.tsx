import { Box, Text } from "@chakra-ui/react";
import theme from "prism-react-renderer/themes/nightOwl";
import React from "react";

import CodeContainer from "./code-container";
import CopyButton from "./copy-button";
import Highlight from "./highlight";

import type { Language } from "prism-react-renderer";

function getLanguage(className: string) {
  switch (className) {
    case "s":
    case "bash":
    case "shell":
      return "shell";
    default:
      return className;
  }
}

function CodeBlock(props) {
  const { className, children, viewlines, ln, displayCode } = props;

  const baseLanguage = getLanguage(className);
  const language = baseLanguage?.replace(/language-/, "") as Language;
  const rawCode = children.trim();

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden">
        {displayCode ? (
          <Highlight
            codeString={rawCode}
            language={language}
            theme={theme}
            metastring={ln}
            showLines={viewlines ?? true}
          />
        ) : (
          <Text>{rawCode}</Text>
        )}
      </CodeContainer>
      <CopyButton top="4" code={rawCode} />
    </Box>
  );
}

export default CodeBlock;
