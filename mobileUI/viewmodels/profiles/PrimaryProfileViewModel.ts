import { createPrimaryProfileApi, PrimaryProfileRequest, getPrimaryProfilesApi } from '../../repositories/ProfileRepository';
import { PrimaryProfile } from '@/models/PrimaryProfileListResponse';
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


export const fetchPrimaryProfiles = async (
  onSuccess: (res: PrimaryProfile[]) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await getPrimaryProfilesApi();
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};