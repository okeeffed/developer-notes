import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

function CodeContainer(props: BoxProps) {
  return <Box padding="5" borderBottomRadius={8} bg="#011627" {...props} />;
}

export default CodeContainer;
