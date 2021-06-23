import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from '../../config';
import ProtectedPage from '../../components/ProtectedPage';

function SingleRetroPage() {
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
  if (!data) return <div>...Loading</div>;
  if (!data || !singleRetro)
    return (
      <div>
        <p>No retro found</p>
        <Link href='/retros'>
          <a>Go back</a>
        </Link>
      </div>
    );

  const {
    title,
    slug,
    overview,
    date,
    user,
    _id,
    techContributions,
    teamContributions,
    widerContributions,
    improvementsAndReflections,
    tags,
    overallFeeling,
  } = singleRetro[0];

  const deleteRetroHandler = async (id) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this retro?'
    );

    if (confirmDelete) {
      const res = await fetch(`/api/retros/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const jsonRes = await res.json();

      if (!res.ok) {
        throw new Error(jsonRes.message || 'Something went wrong!');
      }

      router.push('/retros');
    }
  };

  return (
    <ProtectedPage>
      <div>
        <h1>Single Retro</h1>
        <p>Title: {title}</p>
        <p>Date: {date}</p>
        <p>techContributions: {techContributions}</p>
        <p>teamContributions: {teamContributions}</p>
        <p>widerContributions: {widerContributions}</p>
        <p>improvementsAndReflections: {improvementsAndReflections}</p>

        <Link href={`/retros/edit/${router.query.retroId}`}>
          <a>Edit Retro</a>
        </Link>

        <button onClick={() => deleteRetroHandler(_id)}>Delete Retro</button>
      </div>
    </ProtectedPage>
  );
}

export default SingleRetroPage;

// import { getSession } from 'next-auth/client';
// import React, { useEffect, useState } from 'react';
// import fetch from 'node-fetch';
// import useSWR from 'swr';
// import { API_URL } from '../../config';

// function SingleRetroPage({ singleRetro, message }) {

//   if (!singleRetro) {
//     return <h1>{message}</h1>;
//   }

//   const {
//     title,
//     slug,
//     overview,
//     date,
//     user,
//     techContributions,
//     teamContributions,
//     widerContributions,
//     improvementsAndReflections,
//     tags,
//     overallFeeling,
//   } = singleRetro;

//   return (
//     <div>
//       <h1>Single Retro</h1>
//       <p>{singleRetro.title}</p>
//       <p>Date: {date}</p>
//       <p>techContributions: {techContributions}</p>
//       <p>teamContributions: {teamContributions}</p>
//       <p>widerContributions: {widerContributions}</p>
//       <p>improvementsAndReflections: {improvementsAndReflections}</p>
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

//   const res = await fetch(`${API_URL}/api/retros/${ctx.query.retroId}`, {
//     method: 'GET',
//     headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
//   });
//   const data = await res.json();

//   const {
//     response: { documents },
//     message,
//   } = data;

//   const singleRetro = documents && documents.length > 0 ? documents[0] : null;

//   if (!singleRetro) {
//     return {
//       redirect: {
//         destination: '/404',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { singleRetro, message, session },
//   };
// }

// export default SingleRetroPage;
