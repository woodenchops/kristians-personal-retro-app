import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import EditRetroForm from '../../../components/EditRetroForm';
import ProtectedPage from '../../../components/ProtectedPage';
import { API_URL } from '../../../config';

function addRetroPage() {
  const [singleRetro, setSingleRetro] = useState();
  const router = useRouter();

  const { data, error } = useSWR(
    `${API_URL}/api/retros/${router.query.retroId}`
  );

  useEffect(() => {
    if (data) {
      setSingleRetro(data?.response);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !singleRetro) return <div>loading...</div>;
  return (
    <div>
      <ProtectedPage>
        <EditRetroForm singleRetro={singleRetro} />
      </ProtectedPage>
    </div>
  );
}

export default addRetroPage;
