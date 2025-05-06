import {Category} from './Category';
import {SubQuestionWithoutComments} from './SubQuestionWithoutComments';

export interface Question {
  id: string;
  title: string;
  isPublic: boolean;
  category: Category;
  subQuestions: SubQuestionWithoutComments[];
  commentsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  isLikedByCurrentUser: boolean;
}