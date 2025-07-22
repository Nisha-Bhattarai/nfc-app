// states/usePrimaryProfileState.js
import { useState } from 'react';

export const usePrimaryProfileState = () => {
  const [profileName, setProfileName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [workPhone, setWorkPhone] = useState('');

  const [socialMedia, setSocialMedia] = useState([{ platform: 'facebook', url: '' }]);
  const [relevantLinks, setRelevantLinks] = useState([{ title: '', url: '' }]);
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return {
    profileName, setProfileName,
    firstName, setFirstName,
    lastName, setLastName,
    jobTitle, setJobTitle,
    company, setCompany,
    location, setLocation,
    bio, setBio,
    personalEmail, setPersonalEmail,
    workEmail, setWorkEmail,
    personalPhone, setPersonalPhone,
    workPhone, setWorkPhone,
    socialMedia, setSocialMedia,
    relevantLinks, setRelevantLinks,
    photos, setPhotos,
    loading, setLoading,
    error, setError,
    success, setSuccess
  };
};
