import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../../services/authService';
import { getToken } from '../../../utils/authStorage';

// Loads the logged-in user's profile; optionally supports updating it.
export default function useProfile(loadErrorMessage) {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(await getProfile(getToken()));
        setMessage('');
      } catch {
        setMessage(loadErrorMessage);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfile(
        { name: profile.name, email: profile.email },
        getToken(),
      );
      setMessage(data.message || 'Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return { profile, setProfile, message, handleUpdate };
}
