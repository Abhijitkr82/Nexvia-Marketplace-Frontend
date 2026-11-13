
import { useCallback, useState } from 'react';

// Manages a single dismissible success or error message.
export default function useFlashMessage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const showMessage = useCallback((text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    messageType,
    showMessage,
    clearMessage,
  };
}
