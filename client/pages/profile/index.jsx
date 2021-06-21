// // import React from 'react';
// import { getSession, useSession } from 'next-auth/client';
// // import fetch from 'node-fetch';
// // import { API_URL } from '../../config/index';
// import Profile from '../../components/Profile';
// import { connectToDatabase } from '../../helpers/db-util';

// function ProfilePage({ user }) {
//   const [session, loading] = useSession();

//   // if (loading) return null;

//   // if (!loading && !session) return <p>Access Denied</p>;

//   return (
//     <div>
//       <div>
//         <Profile user={user} />
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const userEmail = session.user.email;

//   const client = await connectToDatabase(`${process.env.AUTH_DB}`);

//   const userCollection = client
//     .db(`${process.env.AUTH_DB}`)
//     .collection(`${process.env.USERS_COLLECTION}`);

//   const user = await userCollection.findOne(
//     { email: userEmail },
//     { projection: { _id: 0, password: 0 } }
//   );

//   client.close();

//   return {
//     props: { session, user },
//   };
// }

// export default ProfilePage;

/** *********
 OLD WAY
 ********** */

import React from 'react';
import { getSession } from 'next-auth/client';
import fetch from 'node-fetch';
import { API_URL } from '../../config/index';
import Profile from '../../components/Profile';

function ProfilePage({ data }) {
  const {
    response: { user },
  } = data;

  return (
    <div>
      <div>
        <Profile user={user} />
      </div>
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

  const res = await fetch(`${API_URL}/api/profile/user-profile`, {
    method: 'GET',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  const data = await res.json();

  return {
    props: { data, session },
  };
}

export default ProfilePage;
