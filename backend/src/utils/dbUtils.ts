import connectDB  from '../db';
import { Collection } from 'mongodb'; // MongoDBのCollection型をインポートする必要があります

async function getDBCollection(collectionName: string): Promise<Collection<any>> { // Collectionのジェネリクス型を適切に指定してください
  const db = await connectDB();
  return db.collection(collectionName);
}

export { getDBCollection };
