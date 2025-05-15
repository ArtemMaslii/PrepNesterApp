import {Status} from "@/interface/Status";
import {Interview} from "@/interface/interviewPreview/Interview";
import {deleteRequest, get} from "@/lib/api/common";
import {InterviewDetails} from "@/interface/interviewDetails";

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

export const fetchInterviewById = (token: string, id: string): Promise<InterviewDetails> => {
  return get<InterviewDetails>(`${API_URL}/interview/${id}`, token);
}

export const deleteInterview = (token: string, id: string): Promise<void> => {
  return deleteRequest(`${API_URL}/interview/${id}`, token);
}