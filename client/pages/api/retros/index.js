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
  const userName = session.user.name;

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
      userName,
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

      if (req.query.search) {
        const { search } = req.query;

        // const searchResult = documents.find((doc) =>
        //   doc.title.includes(search)
        // );

        // const formatQueryString = (doc, property) => {
        //   return doc.property.toLowerCase().includes(search.toLowerCase())
        // }

        const searchResult = documents.filter(
          (doc) =>
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.overview.toLowerCase().includes(search.toLowerCase()) ||
            doc.tags.toLowerCase().includes(search.toLowerCase()) ||
            doc.overallFeeling.toLowerCase().includes(search.toLowerCase()) ||
            doc.date.includes(search.replace(/\//g, '-')) // date filter doesnt work yet - need to import moment.js
        );

        client.close();
        return res.status(201).json({
          message: 'Successfully fetched retro!',
          response: searchResult,
        });
      }

      const { page } = req.query;
      const { limit } = req.query;

      const pageNumber = page;
      const limitNumber = limit;

      const startIndex = (pageNumber - 1) * limitNumber;
      const endIndex = pageNumber * limitNumber;

      const results = {};

      if (startIndex > 0) {
        results.previous = {
          page: pageNumber - 1,
          limit: limitNumber,
        };
      }

      if (endIndex < documents.length) {
        results.next = {
          page: pageNumber + 1,
          limit: limitNumber,
        };
      }

      // if query params arent there, just return full array
      results.data =
        limitNumber && pageNumber
          ? documents.slice(startIndex, endIndex)
          : documents;

      client.close();
      return res.status(201).json({
        message: 'Successfully fetched retros!',
        response: { retros: results.data, retroCount: documents.length },
      });
    } catch (err) {
      return res.status(201).json({ message: 'Failed - Something went wrong' });
    }
  }

  client.close();
}

export default handler;
