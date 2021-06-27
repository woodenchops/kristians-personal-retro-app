import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../config/index';
import Profile from '../../components/Profile';
import ProtectedPage from '../../components/ProtectedPage';
import { useDashBoardContextContext } from '../../contexts/DashBoardContext';

function ProfilePage() {
  const { user } = useDashBoardContextContext();

  // const [user, setUser] = useState();

  // const { data, error } = useSWR(`${API_URL}/api/profile/user-profile`);

  // useEffect(() => {
  //   if (data) {
  //     setUser(data?.response);
  //   }
  // }, [data]);

  // if (error) return <div>failed to load</div>;
  // if (!data || !user) return <div>loading...</div>;

  return (
    <ProtectedPage>
      <div>
        <div>
          <Profile user={user} />
        </div>
      </div>
    </ProtectedPage>
  );
}

export default ProfilePage;
