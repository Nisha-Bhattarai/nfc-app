// repositories/AuthRepository.ts
import apiService from '../services/apiService';
import { SignUpRequest } from '../models/SignUpRequest';
import { SignUpResponse } from '../models/SignUpResponse';
import { saveSession } from '../utils/sessionStorage';

export const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
  const response = await apiService.post<SignUpResponse>('auth/signup', user);
  return response.data;
};

export const verifyEmail = async (email: string, otp: string) => {
  const response = await apiService.post<VerifyOtpResponse>('auth/verifyOtp', { otp, email });
   const { user, token } = response.data;
  await saveSession(user, token);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiService.post<LoginResponse>('auth/login', { email, password });
  const { user, token } = response.data;
  await saveSession(user, token);
  return response.data;
};

export interface VerifyOtpResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}