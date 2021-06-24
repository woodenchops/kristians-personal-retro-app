import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth.util';
import { connectToDatabase } from '../../../helpers/db-util';

export default NextAuth({
  session: { jwt: true },
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    newUser: '/index',
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase({
          database: process.env.AUTH_DB,
        });

        const usersCollection = client
          .db()
          .collection(`${process.env.USERS_COLLECTION}`);

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in');
        }

        client.close();

        return {
          email: user.email,
          id: user._id,
          name: user.name,
        };
      },
    }),
  ],
});
