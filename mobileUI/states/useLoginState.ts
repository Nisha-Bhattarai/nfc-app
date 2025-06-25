// states/useLoginState.ts
import { useState } from 'react';

export const useLoginState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return {
    email, setEmail,
    password, setPassword,
    loading, setLoading,
    error, setError,
  };
};
