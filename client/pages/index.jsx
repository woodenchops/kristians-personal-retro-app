import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import styles from '../styles/Intro.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // create own loading state so that the page content doesnt display whilst loading
  const router = useRouter();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          console.log('session', session);
          router.replace('/retros');
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => console.log('error from Home page, yo', err.message));
  }, [router]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  const forms = (
    <>
      <SignUpForm />
      <LoginForm />
    </>
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.Wrap}>
        <section className={styles.Intro}>
          {/* <h1>
            Welcome to exp<span style={{ color: 'red' }}>AND</span>!
          </h1> */}

          <h1>Welcome to your personal retro collection</h1>
          <h3>view all things related to your personal development</h3>
        </section>
        <section className={styles.SignupLoginForm}>{forms}</section>
      </main>
    </div>
  );
}
