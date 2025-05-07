import {get} from "@/lib/api/common";
import {Question} from "@/interface/Question";
import {SortBy} from "@/interface/SortBy";

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
