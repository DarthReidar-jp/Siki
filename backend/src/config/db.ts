import mongoose from 'mongoose';

const mongodbUri: string = process.env.MONGODB_URI as string;

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(mongodbUri);
    console.log('MongoDB接続に成功しました');
  } catch (error) {
    console.error('MongoDBに接続中にエラーが発生しました:', error);
    throw error;
  }
}

export default connectDB;
