// hooks/useEventHomeAnalyticsState.ts
import { useState, useEffect } from 'react';
import { fetchEventHomeAnalytics } from '../viewmodels/main/HomeViewModel';
import { HomeEventAnalyticsResponse } from '@/models/HomeEventAnalyticsResponse';

export const useHomeEventAnalyticsState = (comparingEventName?: string) => {
  const [analytics, setAnalytics] = useState<HomeEventAnalyticsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAnalytics = () => {
    setLoading(true);
    setError('');
    fetchEventHomeAnalytics(
      comparingEventName,
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
  }, [comparingEventName]);

  return {
    analytics,
    loading,
    error,
    reload: loadAnalytics,
  };
};
