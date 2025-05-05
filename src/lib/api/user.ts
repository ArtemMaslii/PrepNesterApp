import {get} from "@/lib/api";
import {UserDetails} from "@/interface/UserDetails";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const getUserDetails = (token: string, email: string): Promise<UserDetails> => {
  return get<UserDetails>(`${API_URL}/user?email=${email}`, token);
};