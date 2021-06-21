import React from 'react';
import { getSession } from 'next-auth/client';
import fetch from 'node-fetch';
import Link from 'next/link';
import AddRetrosForm from '../../components/AddRetroForm';
import Layout from '../../components/Layout';
import ProtectedPage from '../../components/ProtectedPage';
import RetroItem from '../../components/RetroItem';
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
          documents.map((retro) => <RetroItem key={retro._id} retro={retro} />)}
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
