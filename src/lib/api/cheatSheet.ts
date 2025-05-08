import {get, post} from "@/lib/api/common";
import {CheatSheet} from "@/interface/CheatSheet";
import {SortBy} from "@/interface/SortBy";
import {RequestCheatSheet} from "@/interface/requestCreateCheatSheet";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllCheatSheets = (
    token: string,
    isPublic: boolean = true,
    sortBy: SortBy = SortBy.ASCENDING,
    searchTerm?: string,
    pageNum: number = 0,
    pageSize: number = 25
): Promise<CheatSheet[]> => {
  const url = new URL(`${API_URL}/cheatSheets`);

  if (searchTerm) {
    url.searchParams.append('search', encodeURIComponent(searchTerm));
  }
  url.searchParams.append('isPublic', String(isPublic));
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('pageNum', String(pageNum));
  url.searchParams.append('pageSize', String(pageSize));

  return get<CheatSheet[]>(url.toString(), token);
};

export const createCheatSheet = (
    token: string,
    cheatSheet: RequestCheatSheet
): Promise<CheatSheet> => {
  return post<CheatSheet>(`${API_URL}/cheatSheets`, cheatSheet, token);
}