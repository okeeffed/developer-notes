export type Question = {
  text: string
}

export type AnswerOption = {
  text: string
  isAnswer: boolean
}

export type QuestionType = "singleChoice" | "multiChoice" | "input" | "code"
export type CycleStatus = "displayQuestions" | "displayAnswer"
export type QuizStatus = "inProgress" | "complete"

export interface IQuizQuestion {
  type: QuestionType
  question: Question
  options: AnswerOption[]
}
