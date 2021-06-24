// import React from 'react';
// import { getSession } from 'next-auth/client';
// import fetch from 'node-fetch';
// import Link from 'next/link';
// import { StyledLink } from '../../components/styled-components/button-styles';
// import AddRetrosForm from '../../components/AddRetroForm';
// import Layout from '../../components/Layout';
// import ProtectedPage from '../../components/ProtectedPage';
// import RetroItem from '../../components/RetroItem';
// import { API_URL, PER_PAGE } from '../../config/index';
// import Pagination from '../../components/Pagination';

// function AllRetrosPage({ retros, retroCount, page }) {
//   return (
//     <ProtectedPage>
//       <div>
//         <StyledLink href='/retros/add-retro' buttonText='Add Retro' />
//         {retros &&
//           retros.length > 0 &&
//           retros.map((retro) => <RetroItem key={retro._id} retro={retro} />)}
//       </div>
//       <Pagination page={page} total={retroCount} />
//     </ProtectedPage>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const {
//     query: { page = 1 },
//   } = ctx;

//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const res = await fetch(
//     `${API_URL}/api/retros?limit=${PER_PAGE}&page=${page}`,
//     {
//       method: 'GET',
//       headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
//     }
//   );
//   const data = await res.json();

//   const payload = data && data?.response;

//   const { retros, retroCount } = payload;

//   return {
//     props: { session, retros, retroCount, page },
//   };
// }

// export default AllRetrosPage;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ProtectedPage from '../../components/ProtectedPage';
import RetroItem from '../../components/RetroItem';
import { StyledLink } from '../../components/styled-components/button-styles';
import { API_URL, PER_PAGE } from '../../config/index';
import Pagination from '../../components/Pagination';

function AllRetrosPage() {
  const [retros, setRetros] = useState();

  const router = useRouter();

  const {
    query: { page = 1 },
  } = router;

  const [retroCount, setRetroCount] = useState();

  const { data, error } = useSWR(
    `${API_URL}/api/retros?limit=${PER_PAGE}&page=${page}`
  );

  useEffect(() => {
    if (data) {
      setRetros(data?.response?.retros);
      setRetroCount(data?.response?.retroCount);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !retros) return <div>loading...</div>;
  return (
    <ProtectedPage>
      <div>
        <StyledLink href='/retros/add-retro' buttonText='Add Retro' />

        {retros && retros.length > 0 ? (
          retros.map((retro) => <RetroItem key={retro._id} retro={retro} />)
        ) : (
          <h3>No retros recorded</h3>
        )}
      </div>
      <Pagination page={page} total={retroCount} />
    </ProtectedPage>
  );
}

export default AllRetrosPage;
