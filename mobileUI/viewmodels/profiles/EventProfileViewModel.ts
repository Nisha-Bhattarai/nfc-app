// File: viewmodels/profiles/EventProfileViewModel.ts
import { createEventProfileApi, EventProfileRequest } from '../../repositories/ProfileRepository';

export const createEventProfile = async (
  data: EventProfileRequest,
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await createEventProfileApi(data);
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};