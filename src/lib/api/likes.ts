// lib/api/likes.ts
import {deleteRequest, post} from "@/lib/api/common";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const addLike = (entityType: 'cheatSheets' | 'questions' | 'questions/sub-questions' | 'questions/comments', entityId: string, userId: string, token: string) => {
  return post<void>(`${API_URL}/${entityType}/${entityId}/like`, {userId}, token);
};

export const removeLike = (entityType: 'cheatSheets' | 'questions' | 'questions/sub-questions' | 'questions/comments', entityId: string, userId: string, token: string) => {
  return deleteRequest<void>(`${API_URL}/${entityType}/${entityId}/like?userId=${userId}`, token);
};
