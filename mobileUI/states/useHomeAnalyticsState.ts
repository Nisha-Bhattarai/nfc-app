import { useState, useCallback } from 'react';
import { fetchHomeAnalytics } from '../viewmodels/main/HomeViewModel';
import { HomeAnalyticsResponse } from '@/models/HomeAnalyticsResponse';

export const useHomeAnalyticsState = () => {
  const [homeAnalytics, setHomeAnalytics] = useState<HomeAnalyticsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHomeAnalytics = useCallback(() => {
    setLoading(true);
    setError('');
    fetchHomeAnalytics(
      (data) => {
        setHomeAnalytics(data);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      }
    );
  }, []);

  return {
    homeAnalytics,
    loading,
    error,
    reload: loadHomeAnalytics, 
  };
};
