import * as AuthRepository from '../../repositories/AuthRepository';
import { SignUpRequest } from '../../models/SignUpRequest';
import { SignUpResponse } from '../../models/SignUpResponse';

export const signupUser = async (
  user: SignUpRequest,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
) => {
  try {
    const res: SignUpResponse = await AuthRepository.signup(user);
    onSuccess(res.message);
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Signup failed. Please try again.';
    onError(message);
  }
};