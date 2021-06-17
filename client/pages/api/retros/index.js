import {
  connectToDatabase,
  insertDocument,
  getDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
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
      });

      client.close();
      return res
        .status(201)
        .json({ message: 'Successfully fetched retros!', data: { documents } });
    } catch (err) {
      return res.status(201).json({ message: 'Failed - Something went wrong' });
    }
  }

  client.close();
}

export default handler;
