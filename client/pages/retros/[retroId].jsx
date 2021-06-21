import { getSession } from 'next-auth/client';
import React from 'react';
import fetch from 'node-fetch';
import { API_URL } from '../../config';

function SingleRetroPage({ singleRetro, message }) {
  if (!singleRetro) {
    return <h1>{message}</h1>;
  }

  return (
    <div>
      <h1>Single Retro</h1>
      <p>{singleRetro.title}</p>
    </div>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/retro`);
//   const retros = await res.json();

//   const paths = retros.map((retro) => ({
//     params: { retroId: retro.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/api/retros/${ctx.query.retroId}`, {
    method: 'GET',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  const data = await res.json();

  const {
    response: { documents },
    message,
  } = data;

  const singleRetro = documents && documents.length > 0 ? documents[0] : null;

  if (!singleRetro) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: { singleRetro, message, session },
  };
}

export default SingleRetroPage;
