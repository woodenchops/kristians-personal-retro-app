import React from 'react';
import { getSession } from 'next-auth/client';
import fetch from 'node-fetch';
import Link from 'next/link';
import AddRetrosForm from '../../components/AddRetroForm';
import Layout from '../../components/Layout';
import ProtectedPage from '../../components/ProtectedPage';
import { API_URL } from '../../config/index';

function AllRetrosPage({ data }) {
  const {
    response: { documents },
  } = data;
  return (
    <div>
      <ProtectedPage>
        <Link href='/retros/add-retro'>
          <button>Add Retro</button>
        </Link>
        {documents &&
          documents.length > 0 &&
          documents.map((retro) => (
            <article key={retro._id}>
              <p>Title: {retro.title}</p>
              <p>Overview: {retro.overview}</p>
              <p>Date: {retro.date}</p>
              <p>techContributions: {retro.techContributions}</p>
              <p>teamContributions: {retro.teamContributions}</p>
              <p>widerContributions: {retro.widerContributions}</p>
              <p>
                improvementsAndReflections: {retro.improvementsAndReflections}
              </p>
              <p>tags: {retro.tags}</p>
              <p>overallFeeling: {retro.overallFeeling}</p>
            </article>
          ))}
      </ProtectedPage>
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

  const res = await fetch(`${API_URL}/api/retros/`, {
    method: 'GET',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  const data = await res.json();

  return {
    props: { session, data },
  };
}

export default AllRetrosPage;
