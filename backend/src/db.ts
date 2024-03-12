import mongoose from 'mongoose';

const uri: string = process.env.MONGODB_URI as string;

let dbConnection: mongoose.Connection | null = null;

async function connectDB(): Promise<mongoose.Connection> {
  if (dbConnection) {
    return dbConnection;
  }
  try {
    const options: mongoose.ConnectOptions = {};
    dbConnection = await mongoose.createConnection(uri, options);
    console.log('MongoDB接続に成功しました');
    return dbConnection;
  } catch (error) {
    console.error('MongoDBに接続中にエラーが発生しました:', error);
    throw error;
  }
}

export default connectDB;