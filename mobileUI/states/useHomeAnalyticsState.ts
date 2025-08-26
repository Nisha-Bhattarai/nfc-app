import { useState, useEffect } from 'react';
import { fetchHomeAnalytics } from '../viewmodels/main/HomeViewModel';
import { HomeAnalyticsResponse } from '@/models/HomeAnalyticsResponse';

export const useHomeAnalyticsState = () => {
  const [homeAnalytics, setHomeAnalytics] = useState<HomeAnalyticsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHomeAnalytics = () => {
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
  };

  useEffect(() => {
    loadHomeAnalytics();
  }, []);

  return {
    homeAnalytics,
    loading,
    error,
    reload: loadHomeAnalytics,
  };
};
