import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import {
  AnswerOption,
  InputQuestion,
  MultiChoiceQuestion,
  SingleChoiceQuestion,
} from "./index";

import type { CycleStatus, IQuizQuestion, QuizStatus } from "./QuizTypes";

function displayText(cycleStatus: CycleStatus) {
  switch (cycleStatus) {
    case "displayQuestions":
      return "Submit";
    case "displayAnswer":
    default:
      return "Next question";
  }
}

interface IQuizSection {
  question: IQuizQuestion;
  cycleStatus: CycleStatus;
}
function QuizSection({
  question,
  cycleStatus,
}: IQuizSection): JSX.Element | null {
  switch (question.type) {
    case "singleChoice":
      return <SingleChoiceQuestion cycleStatus={cycleStatus} {...question} />;
    case "multiChoice":
      return <MultiChoiceQuestion cycleStatus={cycleStatus} {...question} />;
    case "input":
      return <InputQuestion cycleStatus={cycleStatus} {...question} />;
    default:
      throw new Error(`Unexpected type: ${question.type}`);
  }
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function randomizeQuestions(questions: IQuizQuestion[]) {
  return questions.map((question: IQuizQuestion) => {
    if (question.type === "input") {
      return question;
    }

    const updatedQuestionOptions = shuffle<AnswerOption>(question.options);

    return {
      ...question,
      options: updatedQuestionOptions,
    };
  });
}

interface ISimpleQuiz {
  questions: IQuizQuestion[];
}
export function SimpleQuiz({ questions }: ISimpleQuiz): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("inProgress");
  const [cycleStatus, setCycleStatus] =
    useState<CycleStatus>("displayQuestions");

  const handleCycle = () => {
    switch (cycleStatus) {
      case "displayQuestions":
        return setCycleStatus("displayAnswer");
      case "displayAnswer":
      default:
        if (!questions[index + 1]) {
          return setQuizStatus("complete");
        }

        setIndex(index + 1);
        return setCycleStatus("displayQuestions");
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuizStatus("inProgress");
    setCycleStatus("displayQuestions");
  };

  switch (quizStatus) {
    case "inProgress":
      return (
        <Center py={4}>
          <VStack h="md" maxW="xl" w="full" p={4} boxShadow="md">
            <QuizSection
              question={questions[index]}
              cycleStatus={cycleStatus}
            />
            <Spacer />
            <Flex w="full" justifyContent="flex-end">
              <Button onClick={handleCycle} colorScheme="gray">
                {displayText(cycleStatus)}
              </Button>
            </Flex>
          </VStack>
        </Center>
      );
    case "complete":
      return (
        <Center py={4}>
          <VStack h="md" maxW="xl" w="full" p={4} boxShadow="md">
            <Heading fontSize="lg" mb={4}>
              Quiz complete!
            </Heading>
            <Button onClick={resetQuiz} colorScheme="gray">
              Take again
            </Button>
          </VStack>
        </Center>
      );
    default:
      throw new Error(
        `Invalid quiz status: ${quizStatus as unknown as string}`
      );
  }
}
