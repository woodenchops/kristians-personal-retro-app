import { getSession } from 'next-auth/client';
import React from 'react';
import fetch from 'node-fetch';
import { API_URL } from '../../config';

function SingleRetroPage({ singleRetro, message }) {
  if (!singleRetro) {
    return <h1>{message}</h1>;
  }

  const {
    title,
    slug,
    overview,
    date,
    user,
    techContributions,
    teamContributions,
    widerContributions,
    improvementsAndReflections,
    tags,
    overallFeeling,
  } = singleRetro;

  return (
    <div>
      <h1>Single Retro</h1>
      <p>{singleRetro.title}</p>
      <p>Date: {date}</p>
      <p>techContributions: {techContributions}</p>
      <p>teamContributions: {teamContributions}</p>
      <p>widerContributions: {widerContributions}</p>
      <p>improvementsAndReflections: {improvementsAndReflections}</p>
    </div>
  );
}

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
