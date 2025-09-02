// repositories/AuthRepository.ts
import apiService from '../services/apiService';
import { SignUpRequest } from '../models/SignUpRequest';
import { SignUpResponse } from '../models/SignUpResponse';
import { saveSession, setRunningProfile, getRunningProfile, getSession } from '../utils/sessionStorage';


export const signup = async (user: SignUpRequest): Promise<SignUpResponse> => {
  const response = await apiService.post<SignUpResponse>('auth/signup', user);
  return response.data;
};

export const verifyEmail = async (email: string, otp: string) => {
  const response = await apiService.post<VerifyOtpResponse>('auth/verifyOtp', { otp, email });
  const { user, token, runningProfile } = response.data;
  await saveSession(user, token);
  if (runningProfile) {
    await setRunningProfile(runningProfile.id, runningProfile.profileType);
  }
  return response.data;
};

export const resendEmailOtp = async (email: string) => {
  const response = await apiService.post<GenerateNewOtpResponse>('auth/generateNewOtp', { email });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiService.post<LoginResponse>('auth/login', { email, password });
  const { user, token, runningProfile } = response.data;
  await saveSession(user, token);
  if (runningProfile) {
    await setRunningProfile(runningProfile.id, runningProfile.profileType);
  }
  return response.data;
};

export interface VerifyOtpResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string,
    profilePicture: string;
  };
  runningProfile: {
    id: string;
    profileType: string;
  }
  token: string;
}

export interface GenerateNewOtpResponse {
  message: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
  };
  runningProfile: {
    id: string;
    profileType: string;
  }
  token: string;
}