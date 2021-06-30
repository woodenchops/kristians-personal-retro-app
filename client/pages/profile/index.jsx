import React from 'react';
import Profile from '../../components/Profile';
import ProtectedPage from '../../components/ProtectedPage';
import { useDashBoardContextContext } from '../../contexts/DashBoardContext';

function ProfilePage() {
  const { user } = useDashBoardContextContext();

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
