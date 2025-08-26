import apiService from '../services/apiService';
import { HomeAnalyticsResponse } from '../models/HomeAnalyticsResponse';
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