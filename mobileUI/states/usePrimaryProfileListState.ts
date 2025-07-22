import { useState, useEffect } from 'react';
import { PrimaryProfile } from '../models/PrimaryProfileListResponse';
import { fetchPrimaryProfiles } from '../viewmodels/profiles/PrimaryProfileViewModel';

export const usePrimaryProfileListState = () => {
  const [profiles, setProfiles] = useState<PrimaryProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProfiles = () => {
    setLoading(true);
    setError('');
    fetchPrimaryProfiles(
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
