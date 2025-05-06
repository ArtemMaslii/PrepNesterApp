export interface SubQuestionWithoutComments {
  id: string;
  title: string;
  commentsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  isLikedByCurrentUser: boolean;
}
