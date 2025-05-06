import {get} from "@/lib/api/common";
import {CheatSheet} from "@/interface/CheatSheet";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllCheatSheets = (token: string): Promise<CheatSheet[]> => {
  return get<CheatSheet[]>(`${API_URL}/cheatSheets`, token);
};