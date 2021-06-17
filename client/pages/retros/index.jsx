import React from 'react';
import AddRetrosForm from '../../components/AddRetroForm';
import Layout from '../../components/Layout';
import ProtectedPage from '../../components/ProtectedPage';

function AllRetrosPage() {
  return (
    <div>
      <ProtectedPage>
        <AddRetrosForm />
      </ProtectedPage>
    </div>
  );
}

export default AllRetrosPage;
