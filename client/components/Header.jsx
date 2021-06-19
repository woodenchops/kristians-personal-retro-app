import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import Search from './Search';
import { useSession, signOut } from 'next-auth/client';
import Notification from './Notification';
import ProtectedPage from './ProtectedPage';
import { useNotificationsContextContext } from '../contexts/NotificationContext';

export default function Header() {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  const NavItems = (
    <>
      {!loading && (
        <header>
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
