import type { CycleStatus } from "./QuizTypes";

export function chooseVariant(
  cycleStatus: CycleStatus,
  isAnswer: boolean
): string {
  switch (true) {
    case cycleStatus === "displayQuestions":
      return "blue";
    case cycleStatus === "displayAnswer" && isAnswer:
      return "green";
    default:
      return "red";
  }
}

export function isActive(
  cycleStatus: CycleStatus,
  text: string,
  selected?: string
): boolean {
  switch (true) {
    case cycleStatus === "displayQuestions":
      return selected === text;
    case cycleStatus === "displayAnswer":
    default:
      return true;
  }
}
