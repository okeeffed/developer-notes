import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { chooseVariant, isActive } from "./QuizUtilities";

import type { CycleStatus, IQuizQuestion } from "./QuizTypes";

interface IMultiChoiceQuestion extends IQuizQuestion {
  cycleStatus: CycleStatus;
}
export function MultiChoiceQuestion({
  question,
  options,
  cycleStatus,
}: IMultiChoiceQuestion): JSX.Element | null {
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  useEffect(() => {
    if (cycleStatus === "displayQuestions") {
      setSelectedArr([]);
    }
  }, [cycleStatus]);

  const toggleSelected = (value: string) => {
    const isSelected = selectedArr.some(
      (selectedValue) => selectedValue === value
    );

    if (isSelected) {
      const newArr = selectedArr.filter(
        (selectedValue) => selectedValue !== value
      );
      setSelectedArr(newArr);
    } else {
      setSelectedArr([...selectedArr, value]);
    }
  };

  return (
    <VStack spacing={2} mb={4} w="full">
      <Heading size="md">{question.text}</Heading>
      <Text mb={8} color="gray">
        Select one or more answers
      </Text>
      {options.map(({ text, isAnswer }) => (
        <Button
          w="full"
          key={text}
          colorScheme={chooseVariant(cycleStatus, isAnswer)}
          variant="outline"
          isActive={selectedArr.some((selected) =>
            isActive(cycleStatus, text, selected)
          )}
          onClick={() => toggleSelected(text)}
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
        >
          {text}
        </Button>
      ))}
    </VStack>
  );
}
