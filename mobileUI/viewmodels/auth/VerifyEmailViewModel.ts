import * as AuthRepository from '../../repositories/AuthRepository';

export const verifyEmailOtp = async (
  email: string,
  otp: string,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
) => {
  try {
    const response = await AuthRepository.verifyEmail(email, otp);
    onSuccess(response.message || 'Email verified successfully!');
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Verification failed. Please try again.';
    onError(message);
  }
};
