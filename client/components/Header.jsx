import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import Search from './Search';
import ProtectedPage from './ProtectedPage';
import styles from '../styles/Header.module.css';
import { useDashBoardContextContext } from '../contexts/DashBoardContext';

export default function Header() {
  const [session, loading] = useSession();

  const { user } = useDashBoardContextContext();

  const logoutHandler = () => {
    signOut();
  };

  function capitaliseFirstLetter(string) {
    return string && string.length > 0
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : '';
  }

  const NavItems = (
    <>
      {!loading && (
        <header className={styles.header} style={{ marginBottom: '2rem' }}>
          <h3>{user && `Welcome, ${capitaliseFirstLetter(user?.name)}!`}</h3>
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
