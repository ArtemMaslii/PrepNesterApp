import {deleteRequest, get, post, put} from "@/lib/api/common";
import {Question} from "@/interface/Question";
import {SortBy} from "@/interface/SortBy";
import {RequestQuestion} from "@/interface/requestCreateQuestion";
import {
  Comment,
  QuestionDetails,
  RequestCreateComment,
  RequestUpdateComment
} from "@/interface/questionDetails";
import {RequestUpdateQuestion} from "@/interface/requestUpdateQuestion";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllQuestions = (
    token: string,
    isPublic: boolean = true,
    sortBy: SortBy = SortBy.ASCENDING,
    searchTerm?: string,
    pageNum: number = 0,
    pageSize: number = 25
): Promise<Question[]> => {
  const url = new URL(`${API_URL}/questions`);

  if (searchTerm) {
    url.searchParams.append('search', encodeURIComponent(searchTerm));
  }
  url.searchParams.append('isPublic', String(isPublic));
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('pageNum', String(pageNum));
  url.searchParams.append('pageSize', String(pageSize));

  return get<Question[]>(url.toString(), token);
};

export const fetchQuestionById = (
    token: string,
    id: string
): Promise<QuestionDetails> => {
  return get<QuestionDetails>(`${API_URL}/questions/${id}`, token);
}

export const fetchSubQuestionById = (
    token: string,
    id: string
): Promise<QuestionDetails> => {
  return get<QuestionDetails>(`${API_URL}/questions/sub-questions/${id}`, token);
}

export const createQuestion = (
    token: string,
    question: RequestQuestion
): Promise<Question> => {
  return post<Question>(`${API_URL}/questions`, question, token);
}

export const updateQuestion = (token: string, id: string, updatedBody: RequestUpdateQuestion): Promise<QuestionDetails> => {
  return put<QuestionDetails>(`${API_URL}/questions/${id}`, updatedBody, token);
}

export const updateSubQuestion = (token: string, id: string, updatedBody: RequestUpdateQuestion): Promise<QuestionDetails> => {
  return put<QuestionDetails>(`${API_URL}/questions/sub-questions/${id}`, updatedBody, token);
}

export const deleteQuestion = (token: string, id: string): Promise<void> => {
  return deleteRequest<void>(`${API_URL}/questions/${id}`, token);
}

export const deleteSubQuestion = (token: string, id: string): Promise<void> => {
  return deleteRequest<void>(`${API_URL}/questions/sub-questions/${id}`, token);
}

export const createCommentForQuestion = (token: string, questionId: string, body: RequestCreateComment): Promise<Comment> => {
  return post<Comment>(`${API_URL}/questions/${questionId}/comments`, body, token);
}

export const createCommentForSubQuestion = (token: string, subQuestionId: string, body: RequestCreateComment): Promise<Comment> => {
  return post<Comment>(`${API_URL}/questions/${subQuestionId}/comments`, body, token);
}

export const updateCommentForQuestion = (token: string, commentId: string, body: RequestUpdateComment): Promise<Comment> => {
  return put<Comment>(`${API_URL}/questions/comments/${commentId}`, body, token);
}

export const updateCommentForSubQuestion = (token: string, commentId: string, body: RequestUpdateComment): Promise<Comment> => {
  return put<Comment>(`${API_URL}/questions/sub-questions/comments/${commentId}`, body, token);
}