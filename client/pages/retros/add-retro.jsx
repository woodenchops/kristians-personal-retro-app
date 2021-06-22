import React from 'react';
import AddRetrosForm from '../../components/AddRetroForm';
import ProtectedPage from '../../components/ProtectedPage';

function addRetroPage() {
  return (
    <div>
      <ProtectedPage>
        <AddRetrosForm />
      </ProtectedPage>
    </div>
  );
}

export default addRetroPage;
