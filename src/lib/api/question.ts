import {get} from "@/lib/api/common";
import {Question} from "@/interface/Question";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllQuestions = (token: string): Promise<Question[]> => {
  return get<Question[]>(`${API_URL}/questions`, token);
};