import { ObjectID } from 'mongodb';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../../helpers/db-util';

export async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(422).json({ message: 'Invalid request' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  let client;

  try {
    client = await connectToDatabase({ database: process.env.RETROS_DB });
  } catch (err) {
    return res.status(500).json({ message: 'Issue connecting to database' });
  }

  const retrosCollection = client
    .db()
    .collection(`${process.env.RETROS_COLLECTION}`);

  const idString = req.query.retroId;

  const retro = await retrosCollection.findOne({
    _id: ObjectID(`${idString}`),
  });

  if (!retro) {
    client.close();
    return res.status(401).json({ message: 'Retro not found!' });
  }

  const result = await retrosCollection.deleteOne({
    _id: ObjectID(`${idString}`),
  });

  client.close();
  return res.status(200).json({ message: 'Retro deleted!' });
}
export default handler;
