import {Status} from "@/interface/Status";
import {Interview} from "@/interface/interviewPreview/Interview";
import {get} from "@/lib/api/common";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllInterviews = (token: string, searchTerm?: string, status?: Status): Promise<Interview[]> => {
  const url = new URL(`${API_URL}/interview`);
  if (searchTerm) {
    url.searchParams.append('search', encodeURIComponent(searchTerm));
  }
  if (status) {
    url.searchParams.append('status', String(status));
  }

  return get<Interview[]>(url.toString(), token);
}