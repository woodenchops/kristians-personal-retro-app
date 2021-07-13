import { MongoClient } from 'mongodb';

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

export async function connectToDatabase({ database }) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mn1hk.mongodb.net/${database}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

  return client;
}

export async function insertDocument({
  client,
  database,
  collection,
  document,
}) {
  const db = client.db(`${database}`);

  await db.collection(`${collection}`).insertOne(document);
}

export async function getDocuments({
  client,
  database,
  collection,
  sort,
  filter = {},
  projection = {},
}) {
  const db = client.db(`${database}`);

  const documents = await db
    .collection(`${collection}`)
    .find(filter, projection)
    .sort(sort)
    .toArray();

  return documents;
}
