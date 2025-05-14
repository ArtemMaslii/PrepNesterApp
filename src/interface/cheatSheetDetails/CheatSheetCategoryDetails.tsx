import {CheatSheetQuestion} from "./CheatSheetQuestion";

export interface CheatSheetCategoryDetails {
  id: string,
  title: string,
  questions: CheatSheetQuestion[]
}