import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ProtectedPage({ children }) {
  const [isLoading, setIsLoading] = useState(true); // create own loading state so that the page content doesnt display whilst loading
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return null;
  }
  return <div>{children}</div>;
}

export default ProtectedPage;
