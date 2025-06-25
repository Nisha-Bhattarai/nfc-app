// repositories/AuthRepository.ts
import apiService from '../services/apiService';
import { SignUpRequest } from '../models/SignUpRequest';
import { SignUpResponse } from '../models/SignUpResponse';

export const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
  const response = await apiService.post<SignUpResponse>('auth/signup', user);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiService.post('auth/login', { email, password });
  return response.data;
};