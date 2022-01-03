import { Box, Heading, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";

import type { CycleStatus, IQuizQuestion } from "./QuizTypes";

interface IInputQuestion extends IQuizQuestion {
  cycleStatus: CycleStatus;
}
export function InputQuestion({
  question,
  options,
  cycleStatus,
}: IInputQuestion): JSX.Element | null {
  return (
    <VStack spacing={2} mb={4} w="full">
      <Heading size="md" mb={4}>
        {question.text}
      </Heading>
      <Input
        placeholder="Your answer"
        disabled={cycleStatus === "displayAnswer"}
      />
      <Box p={2} w="full" textAlign="left">
        {cycleStatus === "displayAnswer" && (
          <>
            <Text size="xs" color="gray" mb={2}>
              Provided answer
            </Text>
            {options.map(({ text }) => (
              <Text key={text}>{text}</Text>
            ))}
          </>
        )}
      </Box>
    </VStack>
  );
}
