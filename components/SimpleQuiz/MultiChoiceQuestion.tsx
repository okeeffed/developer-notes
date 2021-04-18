import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import type { CycleStatus, IQuizQuestion } from "./QuizTypes";
import { chooseVariant, isActive } from "./QuizUtilities";

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
        (selectedValue) => selectedValue === value
      );
      setSelectedArr(newArr);
    } else {
      setSelectedArr([...selectedArr, value]);
    }
  };

  return (
    <VStack spacing={2} mb={4}>
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
        >
          {text}
        </Button>
      ))}
    </VStack>
  );
}
