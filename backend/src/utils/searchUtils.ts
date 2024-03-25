import mongoose from 'mongoose';
import { getQueryVector } from './openaiUtils';

const Page = mongoose.model('Page'); // モデルの取得

async function performVectorSearch(query: string, userId: string): Promise<any[]> {
  const queryVector = await getQueryVector(query);
  const collection = mongoose.connection.db.collection('pages'); // コレクションの取得
  const agg = [
    {
        '$match': { 'userId': userId } // 特定のユーザーIDに基づくフィルタリング
    },
    {
            '$vectorSearch': {
                'index': 'vector_index',
                'path': 'vector',
                'queryVector': queryVector,
                'numCandidates': 100,
                'limit': 10
            }
        },
        {
            '$project': {
                'title': 1,
                'content': 1,
                'score': { '$meta': 'vectorSearchScore' }
            }
        },
        {
            '$sort': { 'score': -1 }
        }
    ];


  const results = await collection.aggregate(agg).toArray(); // 集計とレスポンスの取得
  return results;
}

export { performVectorSearch };
