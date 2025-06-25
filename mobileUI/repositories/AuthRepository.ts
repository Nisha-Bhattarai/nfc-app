// repositories/AuthRepository.ts
import apiService from '../services/apiService';

export const login = async (email: string, password: string) => {
  const response = await apiService.post('auth/login', { email, password });
  return response.data;
};