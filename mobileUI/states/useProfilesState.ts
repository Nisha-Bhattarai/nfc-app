// hooks/useProfilesState.ts
import { useState } from 'react';
import { ProfilesResponse } from '@/models/ProfilesResponse';
import { fetchProfiles as fetchProfilesFromAPI } from '../viewmodels/main/HomeViewModel';

export const useProfilesState = () => {
  const [profileData, setProfileData] = useState<ProfilesResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch profiles on demand
  const fetchProfiles = async () => {
    setLoading(true);
    setError('');
    try {
      await fetchProfilesFromAPI(
        (data: ProfilesResponse) => {
          setProfileData(data);
          setLoading(false);
        },
        (message: string) => {
          setError(message);
          setLoading(false);
        }
      );
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return {
    profileData,
    loading,
    error,
    fetchProfiles, // call this from BottomSheet when it opens
  };
};
