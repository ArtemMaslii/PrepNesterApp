export interface Comment {
  id: string;
  message: string;
  questionId: string;
  subQuestionId: string;
  parentId: string | null;
  likesCount: number;
  replies?: Comment[];
  createdAt: string;
  createdBy: string;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
  isLikedByCurrentUser: boolean;
}