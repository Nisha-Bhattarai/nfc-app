import { useState } from 'react';

export const useCreateContactState = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState(''); // optional - can be updated with an image picker

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return {
    name, setName,
    email, setEmail,
    phone, setPhone,
    note, setNote,
    image, setImage,
    
    loading, setLoading,
    error, setError,
    success, setSuccess
  };
};
