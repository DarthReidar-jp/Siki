import mongoose from 'mongoose';
import connectDB from '../db';

async function getDBCollection(collectionName: string): Promise<mongoose.Collection> {
  const connection = await connectDB();
  return connection.model(collectionName).collection;
}

export { getDBCollection };