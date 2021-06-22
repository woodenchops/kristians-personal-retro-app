import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import ProtectedPage from '../../components/ProtectedPage';
import RetroItem from '../../components/RetroItem';
import { API_URL } from '../../config/index';

function AllRetrosPage() {
  const [retros, setRetros] = useState();

  const { data, error } = useSWR(`${API_URL}/api/retros/`);

  useEffect(() => {
    if (data) {
      setRetros(data?.response);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !retros) return <div>loading...</div>;
  return (
    <ProtectedPage>
      <div>
        <Link href='/retros/add-retro'>
          <a>Add Retro</a>
        </Link>
        {retros &&
          retros.length > 0 &&
          retros.map((retro) => <RetroItem key={retro._id} retro={retro} />)}
      </div>
    </ProtectedPage>
  );
}

export default AllRetrosPage;

// import React from 'react';
// import { getSession } from 'next-auth/client';
// import fetch from 'node-fetch';
// import Link from 'next/link';
// import AddRetrosForm from '../../components/AddRetroForm';
// import Layout from '../../components/Layout';
// import ProtectedPage from '../../components/ProtectedPage';
// import RetroItem from '../../components/RetroItem';
// import { API_URL } from '../../config/index';

// function AllRetrosPage({ data }) {
//   const {
//     response: { documents },
//   } = data;
//   return (
//     <div>
//       <Link href='/retros/add-retro'>
//         <button>Add Retro</button>
//       </Link>
//       {documents &&
//         documents.length > 0 &&
//         documents.map((retro) => <RetroItem key={retro._id} retro={retro} />)}
//     </div>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const res = await fetch(`${API_URL}/api/retros/`, {
//     method: 'GET',
//     headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
//   });
//   const data = await res.json();

//   return {
//     props: { session, data },
//   };
// }

// export default AllRetrosPage;
