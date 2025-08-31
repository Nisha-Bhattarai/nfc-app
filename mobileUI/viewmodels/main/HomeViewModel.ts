import {  HomeAnalyticsResponse } from '@/models/HomeAnalyticsResponse';
import { HomeEventAnalyticsResponse } from '../../models/HomeEventAnalyticsResponse';
import { ProfilesResponse } from '../../models/ProfilesResponse';
import { getHomeAnalytics, getEventHomeAnalytics , getProfiles, setRunningProfileApi} from '../../repositories/HomeRepository';


export const fetchHomeAnalytics = async (
  onSuccess: (res: HomeAnalyticsResponse ) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await getHomeAnalytics();
    onSuccess(response);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};


export const fetchEventHomeAnalytics = async (
  comparingEventName: string | undefined,
  onSuccess: (data: HomeEventAnalyticsResponse) => void,
  onError: (message: string) => void
) => {
  try {
    const data = await getEventHomeAnalytics(comparingEventName);
    onSuccess(data);
  } catch (err: any) {
    onError(err.message || 'Something went wrong while fetching event home analytics');
  }
};

export const fetchProfiles = async (
  onSuccess: (data: ProfilesResponse) => void,
  onError: (message: string) => void
) => {
  try {
    const data = await getProfiles();
    onSuccess(data);
  } catch (err: any) {
    onError(err.message || 'Something went wrong while fetching event home analytics');
  }
};

export const setRunningProfile = async (
  profileId: string,
  profileType: "PRIMARY" | "EVENT",
  onSuccess: (message: string) => void,
  onError: (message: string) => void
) => {
  try {
    // Call backend API
    const response = await setRunningProfileApi(profileId, profileType);

    // Your backend now returns { success, message }
    if (response?.message) {
      onSuccess(response.message);
    } else {
      onSuccess("Profile updated successfully");
    }
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong while updating the running profile";
    onError(message);
  }
};
