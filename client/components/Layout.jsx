import React from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import ProtectedPage from './ProtectedPage';
// import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      {router.route !== '/' && <Header />}
      <div className='container mx-auto max-w-90'>{children}</div>
    </>
  );
}

export default Layout;
