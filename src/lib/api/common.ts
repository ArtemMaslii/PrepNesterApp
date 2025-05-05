import axios from "axios";

export const post = async <T>(url: string, body: unknown): Promise<T> => {
  const response = await axios.post<T>(url, body);
  return response.data;
};

export const get = async <T>(url: string, token: string): Promise<T> => {
  const response = await axios.get<T>(url, {
    headers: token ? {Authorization: `Bearer ${token}`} : {},
  });
  return response.data;
}