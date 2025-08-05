import { useState, useEffect } from 'react';
import { EventProfile } from '../models/EventProfileListResponse';
import { fetchEventProfiles } from '../viewmodels/profiles/EventProfileViewModel';

export const useEventProfileListState = () => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProfiles = () => {
    setLoading(true);
    setError('');
    fetchEventProfiles(
      (data) => {
        setProfiles(data);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    reload: loadProfiles,
  };
};
