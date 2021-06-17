import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth.util';
import { connectToDatabase } from '../../../helpers/db-util';

export default NextAuth({
  session: { jwt: true },
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
        };
      },
    }),
  ],
});
