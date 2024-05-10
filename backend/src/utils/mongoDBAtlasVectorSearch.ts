import mongoose from 'mongoose';
import { getQueryVector } from '../llm/openaiEmbedding';

async function mongoDBAtlasVectorSearch(query: string, userId: string): Promise<any[]> {
  const queryVector = await getQueryVector(query);
  const collection = mongoose.connection.db.collection('pages'); // コレクションの取得
  const agg = [
    {
            '$vectorSearch': {
                'index': 'vector_index',
                'path': 'vector',
                'queryVector': queryVector,
                'numCandidates': 1000,
                'limit': 10
            }
        },
        {
            '$match': { 'userId': userId }
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
  const results = await collection.aggregate(agg).toArray();
  return results;
}

export { mongoDBAtlasVectorSearch };
