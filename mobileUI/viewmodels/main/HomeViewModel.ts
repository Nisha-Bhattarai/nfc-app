import {  HomeAnalyticsResponse } from '@/models/HomeAnalyticsResponse';
import { HomeEventAnalyticsResponse } from '../../models/HomeEventAnalyticsResponse';
import { getHomeAnalytics, getEventHomeAnalytics } from '../../repositories/HomeRepository';


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
