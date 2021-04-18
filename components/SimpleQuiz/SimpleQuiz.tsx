import {
  Button,
  Center,
  Container,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import React, { useState } from "react"
import type { CycleStatus, IQuizQuestion, QuizStatus } from "./QuizTypes"
import {
  InputQuestion,
  MultiChoiceQuestion,
  SingleChoiceQuestion,
} from "./index"

function displayText(cycleStatus: CycleStatus) {
  switch (cycleStatus) {
    case "displayQuestions":
      return "Submit"
    case "displayAnswer":
    default:
      return "Next question"
  }
}

interface IQuizSection {
  question: IQuizQuestion
  cycleStatus: CycleStatus
}
function QuizSection({
  question,
  cycleStatus,
}: IQuizSection): JSX.Element | null {
  switch (question.type) {
    case "singleChoice":
      return <SingleChoiceQuestion cycleStatus={cycleStatus} {...question} />
    case "multiChoice":
      return <MultiChoiceQuestion cycleStatus={cycleStatus} {...question} />
    case "input":
      return <InputQuestion cycleStatus={cycleStatus} {...question} />
    default:
      throw new Error(`Unexpected type: ${question.type}`)
  }
}

interface ISimpleQuiz {
  questions: IQuizQuestion[]
}
export function SimpleQuiz({ questions }: ISimpleQuiz): JSX.Element {
  const [index, setIndex] = useState<number>(0)
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("inProgress")
  const [cycleStatus, setCycleStatus] = useState<CycleStatus>(
    "displayQuestions"
  )

  const handleCycle = () => {
    switch (cycleStatus) {
      case "displayQuestions":
        return setCycleStatus("displayAnswer")
      case "displayAnswer":
      default:
        if (!questions[index + 1]) {
          return setQuizStatus("complete")
        }

        setIndex(index + 1)
        return setCycleStatus("displayQuestions")
    }
  }

  const resetQuiz = () => {
    setIndex(0)
    setQuizStatus("inProgress")
    setCycleStatus("displayQuestions")
  }

  switch (quizStatus) {
    case "inProgress":
      return (
        <Center>
          <Container w="full" maxW="container.sm" p={4} boxShadow="lg">
            <QuizSection
              question={questions[index]}
              cycleStatus={cycleStatus}
            />
            <Flex>
              <Spacer />
              <Button onClick={handleCycle} colorScheme="gray">
                {displayText(cycleStatus)}
              </Button>
            </Flex>
          </Container>
        </Center>
      )
    case "complete":
      return (
        <Center>
          <Container w="full" maxW="container.sm" p={4} boxShadow="lg">
            <Center p={8}>
              <VStack>
                <Text mb={4}>Quiz complete!</Text>
                <Button onClick={resetQuiz} colorScheme="gray">
                  Take again
                </Button>
              </VStack>
            </Center>
          </Container>
        </Center>
      )
    default:
      throw new Error(`Invalid quiz status: ${quizStatus}`)
  }
}
