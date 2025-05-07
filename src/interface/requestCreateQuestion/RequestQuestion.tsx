import {RequestCategory, RequestSubQuestion} from "@/interface/requestCreateQuestion";

export interface RequestQuestion {
  title: string;
  category: RequestCategory;
  isPublic: boolean;
  subQuestions: RequestSubQuestion[];
  createdBy: string;
}