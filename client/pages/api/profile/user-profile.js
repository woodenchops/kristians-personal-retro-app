import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../helpers/db-util';
import { API_URL } from '../../../config/index';

export async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(422).json({ message: 'Invalid request' });
  }

  console.log('api req', req);

  const session = await getSession({ req });

  console.log('HERE', session);

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userEmail = session.user.email;

  const client = await connectToDatabase(`${process.env.AUTH_DB}`);

  const userCollection = client
    .db(`${process.env.AUTH_DB}`)
    .collection(`${process.env.USERS_COLLECTION}`);

  const user = await userCollection.findOne(
    { email: userEmail },
    { projection: { _id: 0, password: 0 } }
  );

  if (!user) {
    client.close();
    return res.status(401).json({ message: 'User not found!' });
  }

  client.close();

  console.log('USER', user);

  return res
    .status(200)
    .json({ message: 'Successfully found user profile', response: { user } });
}
export default handler;
