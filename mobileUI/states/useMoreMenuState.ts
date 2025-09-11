import { useState, useEffect } from 'react';
import { fetchUserDetails } from '../viewmodels/auth/MoreMenuViewModel';
import { UserDetailsResponse } from '@/models/UserDetailsResponse';

export const useMoreMenuState = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUserDetails = () => {
    setLoading(true);
    setError('');
    fetchUserDetails(
      (data) => {
        setUserDetails(data);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  return {
    userDetails,
    loading,
    error,
    reload: loadUserDetails
  };
};
