import { getSession } from 'next-auth/client';
import { connectToDatabase, getDocuments } from '../../../helpers/db-util';

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.user.id;

  let client;

  try {
    client = await connectToDatabase({ database: process.env.RETROS_DB });
  } catch (err) {
    return res.status(500).json({ message: 'Issue connecting to database' });
  }

  if (req.method === 'GET') {
    try {
      const documents = await getDocuments({
        client,
        database: process.env.RETROS_DB,
        collection: process.env.RETROS_COLLECTION,
        filter: {
          user: userId,
          slug: req.query.retroId,
        }, // filter retros that only belong to the logged in user
        projection: { projection: { _id: 1, user: 0 } },
      });

      client.close();

      if (documents && documents.length <= 0) {
        return res.status(422).json({
          message: 'No retro found!',
          response: null,
        });
      }

      return res.status(201).json({
        message: 'Successfully fetched retros!',
        response: documents,
      });
    } catch (err) {
      return res.status(201).json({ message: 'Failed - Something went wrong' });
    }
  }

  client.close();
}

export default handler;
