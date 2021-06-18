import React, { createContext, useState, useContext } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const [notification, setNotification] = useState(null);

  const NofiticationMessage = ({ status, title, message }) => {
    setRequestStatus(status);
    setNotification({
      status,
      title,
      message,
    });
  };

  const removeNotification = () => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setNotification(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  };

  const store = {
    requestStatus,
    setRequestStatus,
    requestError,
    setRequestError,
    notification,
    setNotification,
    NofiticationMessage,
    removeNotification,
  };

  return (
    <NotificationsContext.Provider value={store}>
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContextContext() {
  return useContext(NotificationsContext);
}
