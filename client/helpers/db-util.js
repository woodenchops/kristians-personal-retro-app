import { MongoClient } from 'mongodb';

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
}) {
  const db = client.db(`${database}`);

  const documents = await db
    .collection(`${collection}`)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
