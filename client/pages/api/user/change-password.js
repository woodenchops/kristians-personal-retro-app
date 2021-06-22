import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../helpers/auth.util';
import { connectToDatabase } from '../../../helpers/db-util';

export async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(422).json({ message: 'Invalid request' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { oldPassword, newPassword } = req.body;

  const userEmail = session.user.email;

  const client = await connectToDatabase(`${process.env.AUTH_DB}`);

  const userCollection = client
    .db()
    .collection(`${process.env.USERS_COLLECTION}`);

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(401).json({ message: 'User not found!' });
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    client.close();
    return res.status(422).json({ message: 'Passwords dont match' });
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  return res.status(200).json({ message: 'Password updated!' });
}
export default handler;
