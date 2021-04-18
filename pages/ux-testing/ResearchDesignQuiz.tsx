import React from "react"
import type { IQuizQuestion } from "../../components/SimpleQuiz"
import { SimpleQuiz } from "../../components/SimpleQuiz"

const questions: IQuizQuestion[] = [
  {
    type: "singleChoice",
    question: {
      text: "What is the color of the sky?",
    },
    options: [
      {
        text: "Green",
        isAnswer: false,
      },
      {
        text: "Blue",
        isAnswer: true,
      },
      {
        text: "Red",
        isAnswer: false,
      },
    ],
  },
  {
    type: "multiChoice",
    question: {
      text: "How am I today?",
    },
    options: [
      {
        text: "Happy",
        isAnswer: false,
      },
      {
        text: "Sad",
        isAnswer: true,
      },
      {
        text: "Whatever",
        isAnswer: false,
      },
      {
        text: "Peaches",
        isAnswer: false,
      },
    ],
  },
  {
    type: "input",
    question: {
      text: "What is the answer?",
    },
    options: [
      {
        text: "This is the way",
        isAnswer: true,
      },
    ],
  },
]

export function ThreeApproachesQuiz(): JSX.Element {
  return <SimpleQuiz questions={questions} />
}
