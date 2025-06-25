import * as AuthRepository from '../../repositories/AuthRepository';

export const loginUser = async (
  email: string,
  password: string,
  onSuccess: (data: any) => void,
  onError: (message: string) => void
) => {
  try {
    const userData = await AuthRepository.login(email, password);
    onSuccess(userData);
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login failed. Please try again.';
    onError(message);
  }
};