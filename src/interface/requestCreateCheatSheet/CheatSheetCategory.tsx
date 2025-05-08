import {Question} from "@/interface/Question";

export interface CheatSheetCategory {
  id: string;
  name: string;
  questions: Question[];
}