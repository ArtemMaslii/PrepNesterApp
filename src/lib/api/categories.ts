import {get} from "@/lib/api/common";
import {Category} from "@/interface/Category";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const fetchAllCategories = (token: string): Promise<Category[]> => {
  return get<Category[]>(`${API_URL}/categories`, token);
};