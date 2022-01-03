import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { chooseVariant, isActive } from "./QuizUtilities";

import type { CycleStatus, IQuizQuestion } from "./QuizTypes";

interface ISingleChoiceQuestion extends IQuizQuestion {
  cycleStatus: CycleStatus;
}
export function SingleChoiceQuestion({
  question,
  options,
  cycleStatus,
}: ISingleChoiceQuestion): JSX.Element | null {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (cycleStatus === "displayQuestions") {
      setSelected(undefined);
    }
  }, [cycleStatus]);

  return (
    <VStack spacing={2} mb={4} w="full">
      <Heading size="md">{question.text}</Heading>
      {question.description && (
        <Text fontStyle="italic">{question.description}</Text>
      )}
      <Text mb={4} color="gray">
        Select one answer
      </Text>
      {options.map(({ text, isAnswer }) => (
        <Button
          w="full"
          key={text}
          colorScheme={chooseVariant(cycleStatus, isAnswer)}
          _hover={{
            bgColor:
              cycleStatus === "displayAnswer"
                ? chooseVariant(cycleStatus, isAnswer)
                : undefined,
          }}
          _disabled={{
            opacity: 1,
            cursor: "not-allowed",
          }}
          isDisabled={cycleStatus === "displayAnswer"}
          variant="outline"
          isActive={isActive(cycleStatus, text, selected)}
          onClick={() => setSelected(text)}
        >
          {text}
        </Button>
      ))}
    </VStack>
  );
}
