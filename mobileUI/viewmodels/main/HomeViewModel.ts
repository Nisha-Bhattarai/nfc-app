import {  HomeAnalyticsResponse } from '@/models/HomeAnalyticsResponse';
import { getHomeAnalytics } from '../../repositories/HomeRepository';


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
