// File: viewmodels/profiles/EventProfileViewModel.ts
import { createEventProfileApi, EventProfileRequest } from '../../repositories/ProfileRepository';
import { getEventProfilesApi } from '../../repositories/ProfileRepository';
import { deleteEventProfileApi } from '../../repositories/ProfileRepository';
import { EventProfile } from '@/models/EventProfileListResponse';

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


export const fetchEventProfiles = async (
  onSuccess: (res: EventProfile[]) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await getEventProfilesApi();
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};

export const deleteEventProfile = async (
  id: string,
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await deleteEventProfileApi(id);
    onSuccess(response);
  } catch (error: any) {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};