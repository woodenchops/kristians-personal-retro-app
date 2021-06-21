import { getSession } from 'next-auth/client';
import slugify from 'slugify';
import {
  connectToDatabase,
  insertDocument,
  getDocuments,
} from '../../../helpers/db-util';

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

  if (req.method === 'POST') {
    const {
      title,
      overview,
      date,
      techContributions,
      teamContributions,
      widerContributions,
      improvementsAndReflections,
      tags,
      overallFeeling,
    } = req.body;

    if (!title) {
      client.close();
      return res.status(422).json({ message: 'Fill out all details, please' });
    }

    const retroSlug = slugify(title, { lower: true });

    const newRetroDocumentToInsert = {
      title,
      overview,
      date,
      techContributions,
      teamContributions,
      widerContributions,
      improvementsAndReflections,
      tags,
      overallFeeling,
      user: userId,
      slug: retroSlug,
    };

    try {
      await insertDocument({
        client,
        database: process.env.RETROS_DB,
        collection: process.env.RETROS_COLLECTION,
        document: newRetroDocumentToInsert,
      });

      client.close();

      return res.status(201).json({
        message: 'Successfully added retro!',
        data: newRetroDocumentToInsert,
      });
    } catch (err) {
      return res.status(201).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getDocuments({
        client,
        database: process.env.RETROS_DB,
        collection: process.env.RETROS_COLLECTION,
        sort: { _id: -1 },
        filter: { user: userId }, // filter retros that only belong to the logged in user
      });

      client.close();
      return res.status(201).json({
        message: 'Successfully fetched retros!',
        response: { documents },
      });
    } catch (err) {
      return res.status(201).json({ message: 'Failed - Something went wrong' });
    }
  }

  client.close();
}

export default handler;
