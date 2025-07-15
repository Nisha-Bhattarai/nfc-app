import { createPrimaryProfileApi, PrimaryProfileRequest } from '../../repositories/ProfileRepository';

export const createPrimaryProfile = async (
  data: PrimaryProfileRequest,
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await createPrimaryProfileApi(data);
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};


