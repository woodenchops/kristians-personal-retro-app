import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/client';
import Search from './Search';
import Notification from './Notification';
import ProtectedPage from './ProtectedPage';
import styles from '../styles/Header.module.css';
import { useNotificationsContextContext } from '../contexts/NotificationContext';

export default function Header() {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  const NavItems = (
    <>
      {!loading && (
        <header className={styles.header} style={{ marginBottom: '2rem' }}>
          <nav>
            <ul>
              {!session && (
                <li>
                  <Link href='/'>
                    <a>Login</a>
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              )}
              <li>
                <Link href='/retros'>
                  <a>Retros</a>
                </Link>
              </li>
              {session && (
                <li>
                  <Link href='/profile'>
                    <a>Profile</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <Search />
        </header>
      )}
    </>
  );
  return (
    <>
      <ProtectedPage>{NavItems}</ProtectedPage>
    </>
  );
}
