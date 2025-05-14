import {CheatSheetSubQuestion} from "./CheatSheetSubQuestion";

export interface CheatSheetQuestion {
  id: string,
  title: string,
  isPublic: boolean,
  subQuestions: CheatSheetSubQuestion[],
  commentsCount: number,
}