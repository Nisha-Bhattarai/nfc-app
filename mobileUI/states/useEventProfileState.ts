import { useState } from 'react';

export const useEventProfileState = () => {
  const [eventProfileName, setEventProfileName] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [aboutEvent, setAboutEvent] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [workPhone, setWorkPhone] = useState('');

  const [socialMedia, setSocialMedia] = useState([{ platform: 'facebook', url: '' }]);
  // const [relevantLinks, setRelevantLinks] = useState([{ title: '', url: '' }]);
    const [relevantLinks, setRelevantLinks] = useState([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [photoGallery, setPhotoGallery] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return {
    eventProfileName, setEventProfileName,
    eventName, setEventName,
    startDate, setStartDate,
    endDate, setEndDate,
    location, setLocation,
    aboutEvent, setAboutEvent,
    personalEmail, setPersonalEmail,
    workEmail, setWorkEmail,
    personalPhone, setPersonalPhone,
    workPhone, setWorkPhone,
    socialMedia, setSocialMedia,
    relevantLinks, setRelevantLinks,
    skills, setSkills,
    certifications, setCertifications,
    photoGallery, setPhotoGallery,
    loading, setLoading,
    error, setError,
    success, setSuccess
  };
};
