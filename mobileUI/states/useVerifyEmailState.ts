import { useState } from 'react';

export const useVerifyEmailState = () => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return {
    loading, setLoading,
    otpLoading, setOtpLoading,
    error, setError,
    success, setSuccess,
  };
};
