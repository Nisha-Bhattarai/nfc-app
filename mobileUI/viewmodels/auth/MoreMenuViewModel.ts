import { fetchUserDetailsApi, disconnectHubspotApi, changePasswordApi, ChangePasswordRequest } from '../../repositories/AuthRepository'
import { UserDetailsResponse } from '../../models/UserDetailsResponse'

export const fetchUserDetails = async (
  onSuccess: (res: UserDetailsResponse) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await fetchUserDetailsApi();
    console.log("sdasdsadsdadsdsds ====>\n\n", JSON.stringify(response))
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};

export const disconnectHubspot = async (
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await disconnectHubspotApi();
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

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  const changePasswordRequest: ChangePasswordRequest = {
    currentPassword,
    newPassword,
  };

  const response = await changePasswordApi(changePasswordRequest);

  if (response.error) {
    onError(response.error);
  } else {
    onSuccess(response.message);
  }
};