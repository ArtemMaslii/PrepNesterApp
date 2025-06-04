import {postLogin} from "@/lib/api";
import {JwtAuthResponse, LoginDto} from "@/interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:8080/api/v1';

export const loginUser = (loginDto: LoginDto): Promise<JwtAuthResponse> => {
  return postLogin<JwtAuthResponse>(`${API_URL}/auth/login`, loginDto);
};