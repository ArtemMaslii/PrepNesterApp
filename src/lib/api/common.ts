import axios from "axios";

export const post = async <T>(url: string, body: unknown, token: string): Promise<T> => {
  const response = await axios.post<T>(url, body, {
    headers: token ? {Authorization: `Bearer ${token}`} : {},
  });
  return response.data;
};

export const get = async <T>(url: string, token: string): Promise<T> => {
  const response = await axios.get<T>(url, {
    headers: token ? {Authorization: `Bearer ${token}`} : {},
  });
  return response.data;
}

export const deleteRequest = async <T>(url: string, token: string): Promise<T> => {
  const response = await axios.delete<T>(url, {
    headers: token ? {Authorization: `Bearer ${token}`} : {},
  });
  return response.data;
}