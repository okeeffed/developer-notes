import React from "react"
import type { IQuizQuestion } from "../../components/SimpleQuiz"
import { SimpleQuiz } from "../../components/SimpleQuiz"

const questions: IQuizQuestion[] = [
  {
    type: "multiChoice",
    question: {
      text: "What types of research are there?",
    },
    options: [
      {
        text: "Quantatitive",
        isAnswer: true,
      },
      {
        text: "Pragmatic",
        isAnswer: false,
      },
      {
        text: "Qualitative",
        isAnswer: true,
      },
      {
        text: "Mixed methods research",
        isAnswer: true,
      },
      {
        text: "Combined methods research",
        isAnswer: false,
      },
      {
        text: "Numeric",
        isAnswer: false,
      },
    ],
  },
  {
    type: "singleChoice",
    question: {
      text: "What type of research method is this?",
      description:
        "An approach to inquiry involving collecting both quantitative and qualitative data, integrating the two forms of data, and using distinct designs that may involve philosophical assumptions and theoretical frameworks. The core assumption of this form of inquiry is that the integration of qualitative and quantitative data yields additional insight beyond the information provided by either the quantitative or qualitative data alone",
    },
    options: [
      {
        text: "Quantatitive",
        isAnswer: false,
      },
      {
        text: "Pragmatic",
        isAnswer: false,
      },
      {
        text: "Qualitative",
        isAnswer: false,
      },
      {
        text: "Mixed methods research",
        isAnswer: true,
      },
      {
        text: "Combined methods research",
        isAnswer: false,
      },
    ],
  },
  {
    type: "singleChoice",
    question: {
      text: "What type of research method is this?",
      description:
        "An approach for exploring and understanding the meaning individuals or groups ascribe to a social or human problem. The process of research involves emerging questions and procedures, data typically collected in the participant’s setting, data analysis inductively building from particulars to general themes, and the researcher making interpretations of the meaning of the data. The final written report has a flexible structure. Those who engage in this form of inquiry support a way of looking at research that honors an inductive style, a focus on individual meaning, and the importance of reporting the complexity of a situation.",
    },
    options: [
      {
        text: "Quantatitive",
        isAnswer: false,
      },
      {
        text: "Pragmatic",
        isAnswer: false,
      },
      {
        text: "Qualitative",
        isAnswer: true,
      },
      {
        text: "Mixed methods research",
        isAnswer: false,
      },
      {
        text: "Combined methods research",
        isAnswer: false,
      },
    ],
  },
  {
    type: "singleChoice",
    question: {
      text: "What type of research method is this?",
      description:
        "An approach for testing objective theories by examining the relationship among variables. These variables, in turn, can be measured, typically on instruments, so that numbered data can be analyzed using statistical procedures. The final written report has a set structure consisting of introduction, literature and theory, methods, results, and discussion.",
    },
    options: [
      {
        text: "Quantatitive",
        isAnswer: true,
      },
      {
        text: "Pragmatic",
        isAnswer: false,
      },
      {
        text: "Qualitative",
        isAnswer: false,
      },
      {
        text: "Mixed methods research",
        isAnswer: false,
      },
      {
        text: "Combined methods research",
        isAnswer: false,
      },
    ],
  },
  {
    type: "singleChoice",
    question: {
      text: "How should research methods be approached?",
    },
    options: [
      {
        text: "As distinct, separate entites",
        isAnswer: false,
      },
      {
        text: "As a spectrum where the definitions can cross-over",
        isAnswer: true,
      },
    ],
  },
]

export function ThreeApproachesQuiz(): JSX.Element {
  return <SimpleQuiz questions={questions} />
}
