import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI as string;
const client: MongoClient = new MongoClient(uri);

let dbInstance: Db | null = null; // dbInstance をDb型またはnull型で初期化

// MongoDB データベースへの接続を管理する関数
async function connectDB(): Promise<Db> {
  // 既に接続が確立されている場合、既存の接続を再利用
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // MongoDB データベースに接続を試みる
    await client.connect();

    // 接続が成功した場合、データベース名 "knowledge" を指定して dbInstance を設定
    dbInstance = client.db("productver0");
    return dbInstance; // dbInstance を返してアプリケーション内で使用可能にする
  } catch (error) {
    // エラーハンドリング: 接続中にエラーが発生した場合
    console.error("MongoDBに接続中にエラーが発生しました:", error);
    throw error; // エラーを再スローしてハンドリングできるようにする
  }
}

export default connectDB; // connectDB 関数をモジュールとしてエクスポート
