export interface CheatSheet {
  id: string;
  title: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  likesCount: number;
  createdBy: string;
  updatedBy: string;
  isLikedByCurrentUser: boolean;
}