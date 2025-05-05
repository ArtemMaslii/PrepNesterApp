import {post} from "@/lib/api";
import {LoginDto, JwtAuthResponse} from "@/interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1/auth';

export const loginUser = (loginDto: LoginDto): Promise<JwtAuthResponse> => {
  return post<JwtAuthResponse>(`${API_URL}/login`, loginDto);
};