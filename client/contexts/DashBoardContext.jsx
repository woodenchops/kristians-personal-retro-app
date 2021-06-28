import { useRouter } from 'next/router';
import React, { createContext, useState, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { API_URL } from '../config';

export const DashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWR(`${API_URL}/api/profile/user-profile`);

  useEffect(() => {
    if (data) {
      setUser(data?.response);
      setIsLoading(false);
    }
  }, [data]);

  const store = {
    user,
    setUser,
  };

  if (error) return <div>failed to load</div>;
  if (!data || isLoading) return <div>loading...</div>;

  return (
    <DashBoardContext.Provider value={store}>
      {children}
    </DashBoardContext.Provider>
  );
};

export function useDashBoardContextContext() {
  return useContext(DashBoardContext);
}
