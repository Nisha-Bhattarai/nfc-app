// hooks/useEventHomeAnalyticsState.ts
import { useState, useEffect } from 'react';
import { fetchEventHomeAnalytics } from '../viewmodels/main/HomeViewModel';
import { HomeEventAnalyticsResponse } from '@/models/HomeEventAnalyticsResponse';

export const useHomeEventAnalyticsState = (comparingProfileId?: string) => {
  const [analytics, setAnalytics] = useState<HomeEventAnalyticsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAnalytics = () => {
    setLoading(true);
    setError('');
    fetchEventHomeAnalytics(
      comparingProfileId,
      (data) => {
        setAnalytics(data);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadAnalytics();
  }, [comparingProfileId]);

  return {
    analytics,
    loading,
    error,
    reload: loadAnalytics,
  };
};
