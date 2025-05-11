export interface RequestCreateComment {
  message: string;
  parentId?: string;
  createdBy: string;
}