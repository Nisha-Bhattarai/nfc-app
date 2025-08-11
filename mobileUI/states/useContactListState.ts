import { useState, useEffect } from 'react';
import { fetchContactLists } from '../viewmodels/auth/ContactViewModel';
import { Contact } from '@/models/CreateContactRequest';

export const useContactListState = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadContacts = () => {
    setLoading(true);
    setError('');
    fetchContactLists(
      (data) => {
        setContacts(data);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    reload: loadContacts,
  };
};
