import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import RetroItem from '../../../components/RetroItem';
import { API_URL } from '../../../config/index';

export default function SearchPage() {
  const router = useRouter();

  const {
    query: { search },
  } = router;

  const [retros, setRetros] = useState();

  const { data, error } = useSWR(`${API_URL}/api/retros?search=${search}`);

  useEffect(() => {
    if (data) {
      setRetros(data?.response);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !retros) return <div>loading...</div>;

  return (
    <>
      <Link href='/retros'>Go Back</Link>
      <h1>Search Results for {`"${router.query.search}"`}</h1>
      {retros.length === 0 && <h3>No retros to show</h3>}

      {retros &&
        retros.length > 0 &&
        retros.map((retro) => <RetroItem key={retro._id} retro={retro} />)}
    </>
  );
}
