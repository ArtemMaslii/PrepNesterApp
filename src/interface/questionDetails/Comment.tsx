export interface Comment {
  id: string;
  message: string;
  questionId: string;
  subQuestionId: string;
  parentId: string | null;
  likesCount: number;
  replies?: Comment[];
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
  isLikedByCurrentUser: boolean;
}