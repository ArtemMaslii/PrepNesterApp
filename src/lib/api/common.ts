import axios from "axios";

export const post = async <T>(url: string, body: unknown): Promise<T> => {
  const response = await axios.post<T>(url, body);
  return response.data;
};