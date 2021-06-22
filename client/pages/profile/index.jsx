import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../config/index';
import Profile from '../../components/Profile';
import ProtectedPage from '../../components/ProtectedPage';

function ProfilePage() {
  const [user, setUser] = useState();

  const { data, error } = useSWR(`${API_URL}/api/profile/user-profile`);

  useEffect(() => {
    if (data) {
      setUser(data?.response);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !user) return <div>loading...</div>;

  return (
    <ProtectedPage>
      <div>
        <div>
          <Profile user={user} />
        </div>
      </div>
    </ProtectedPage>
  );
}

export default ProfilePage;

// // // import React from 'react';
// import React from 'react';
// import useSWR from 'swr';
// import { getSession } from 'next-auth/client';
// import fetch from 'node-fetch';
// import { API_URL } from '../../config/index';
// import Profile from '../../components/Profile';

// function ProfilePage({ data }) {
//   const {
//     response: { user },
//   } = data;

//   return (
//     <div>
//       <div>
//         <Profile user={user} />
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const res = await fetch(`${API_URL}/api/profile/user-profile`, {
//     method: 'GET',
//     headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
//   });
//   const data = await res.json();

//   return {
//     props: { data, session },
//   };
// }

// export default ProfilePage;

// // import React from 'react';
