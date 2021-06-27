import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../config';

export const DashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`${API_URL}/api/profile/user-profile`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.response);
      });
  }, []);

  const store = {
    user,
  };

  return (
    <DashBoardContext.Provider value={store}>
      {children}
    </DashBoardContext.Provider>
  );
};

export function useDashBoardContextContext() {
  return useContext(DashBoardContext);
}
