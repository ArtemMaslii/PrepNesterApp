import {Category} from "@/interface/Category";
import {Comment} from "./Comment";

export interface QuestionDetails {
  id: string;
  title: string;
  isPublic: boolean;
  category: Category;
  comments: Comment[];
  likesCount: number;
  createdAt: string;
}