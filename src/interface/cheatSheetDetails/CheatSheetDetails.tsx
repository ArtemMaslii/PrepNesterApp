import {CheatSheetCategoryDetails} from "./CheatSheetCategoryDetails";

export interface CheatSheetDetails {
  id: string,
  title: string,
  isPublic: boolean,
  categories: CheatSheetCategoryDetails[]
  createdBy: string,
  updatedBy: string,
}