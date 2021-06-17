import { hashPassword } from '../../../helpers/auth.util';
import { connectToDatabase, insertDocument } from '../../../helpers/db-util';

async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase({ database: process.env.AUTH_DB });
  } catch (err) {
    return res.status(500).json({ message: 'Issue connecting to database' });
  }

  if (req.method === 'POST') {
    const { name, email, password, confirmPassword } = req.body;

    if (
      !name ||
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7 ||
      password.trim() !== confirmPassword.trim()
    ) {
      client.close();
      return res.status(422).json({
        message:
          'Fill out all fields - password must be at least 7 characters long',
      });
    }

    const db = client.db();

    const existingUser = await db
      .collection(`${process.env.USERS_COLLECTION}`)
      .findOne({ email });

    if (existingUser) {
      client.close();
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUserDocument = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const result = await insertDocument({
        client,
        database: process.env.AUTH_DB,
        collection: process.env.USERS_COLLECTION,
        document: newUserDocument,
      });

      client.close();

      return res.status(201).json({
        message: 'Successfully created user!',
      });
    } catch (err) {
      return res.status(201).json({ message: 'Inserting data failed!' });
    }
  }
}

export default handler;
