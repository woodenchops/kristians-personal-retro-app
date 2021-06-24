import React, { createContext, useState, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { API_URL } from '../config';

export const DashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [dashBoard, setDashBoard] = useState();

  const { data, error } = useSWR(`${API_URL}/api/profile/user-profile`);

  useEffect(() => {
    if (data) {
      setDashBoard(data?.response);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !dashBoard) return <div>loading...</div>;

  const store = {
    dashBoard,
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
