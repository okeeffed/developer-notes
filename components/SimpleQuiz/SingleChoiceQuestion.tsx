import { Button, Heading, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import type { CycleStatus, IQuizQuestion } from "./QuizTypes"
import { chooseVariant, isActive } from "./QuizUtilities"

interface ISingleChoiceQuestion extends IQuizQuestion {
  cycleStatus: CycleStatus
}
export function SingleChoiceQuestion({
  question,
  options,
  cycleStatus,
}: ISingleChoiceQuestion): JSX.Element | null {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (cycleStatus === "displayQuestions") {
      setSelected(undefined)
    }
  }, [cycleStatus])

  return (
    <VStack spacing={2} mb={4}>
      <Heading size="md">{question.text}</Heading>
      <Text mb={4} color="gray">
        Select one answer
      </Text>
      {options.map(({ text, isAnswer }) => (
        <Button
          w="full"
          key={text}
          colorScheme={chooseVariant(cycleStatus, isAnswer)}
          variant="outline"
          isActive={isActive(cycleStatus, text, selected)}
          onClick={() => setSelected(text)}
        >
          {text}
        </Button>
      ))}
    </VStack>
  )
}
