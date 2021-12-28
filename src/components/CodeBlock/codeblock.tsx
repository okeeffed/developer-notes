import { Box, Text } from "@chakra-ui/react";
import theme from "prism-react-renderer/themes/nightOwl";
import React from "react";

import CodeContainer from "./code-container";
import CopyButton from "./copy-button";
import Highlight from "./highlight";

function CodeBlock(props) {
  const { className, children, viewlines, ln, displayCode } = props;

  const language = className?.replace(/language-/, "");
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
