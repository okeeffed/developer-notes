import { Box, Text } from "@chakra-ui/react";
import { BlockMath as Math } from "react-katex";

import "katex/dist/katex.min.css";

const BlockMath = ({ title = "Math block", ...props }) => {
  return (
    <Box boxShadow="md" borderRadius="md" overflow="hidden">
      <Box bgColor="gray.100" textAlign="center" p={2}>
        <Text
          fontWeight="700"
          textTransform="uppercase"
          color="gray.600"
          fontSize="xs"
        >
          {title}
        </Text>
      </Box>
      <Math {...props} />
    </Box>
  );
};

export default BlockMath;
