import apiService from '../services/apiService';
import { HomeAnalyticsResponse } from '../models/HomeAnalyticsResponse';
import { HomeEventAnalyticsResponse } from '../models/HomeEventAnalyticsResponse';
import { ProfilesResponse } from '../models/ProfilesResponse';
import { getSession } from '../utils/sessionStorage'; // <-- adjust path

export const getHomeAnalytics = async (): Promise<HomeAnalyticsResponse> => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('User not found in session');
    }

    const userId = session.user.id;
    console.log(`UIDDDDDDDD ======> ${userId}`)
    const response = await apiService.get<HomeAnalyticsResponse>(
      `primaryProfile/getHomeAnalytics/${userId}`
    );

    return response.data;
  } catch (err) {
    console.error('Failed to fetch home analytics', err);
    throw err;

  }
}

export const getEventHomeAnalytics = async (
  comparingEventName?: string
): Promise<HomeEventAnalyticsResponse> => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('User not found in session');
    }

    const userId = session.user.id;

    const response = await apiService.get<HomeEventAnalyticsResponse>(
      `eventProfile/getHomeAnalytics/${userId}${
        comparingEventName ? `?comparingEventName=${encodeURIComponent(comparingEventName)}` : ''
      }`
    );

    return response.data;
  } catch (err) {
    console.error('Failed to fetch event home analytics', err);
    throw err;
  }
};

export const getProfiles = async (): Promise<ProfilesResponse> => {
  try {
    const response = await apiService.get<ProfilesResponse>("profile/all");
    return response.data;
  } catch (err) {
    console.error('Failed to fetch profiles', err);
    throw err;
  }
};

interface SetRunningProfileRequest {
  profileId: string;
  profileType: string;
}

interface SetRunningProfileResponse {
  message: string;
  success: boolean;
}

export const setRunningProfileApi = async (profileId: string, profileType: string): Promise<SetRunningProfileResponse> => {
  try {
    const payload: SetRunningProfileRequest = { profileId: profileId, profileType: profileType};
    const response = await apiService.put<SetRunningProfileResponse>("profile/updateRunningProfile", payload);
    return response.data;
  } catch (err) {
    console.error("Failed to set running profile", err);
    throw err;
  }
};