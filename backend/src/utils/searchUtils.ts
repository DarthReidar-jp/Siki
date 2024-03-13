import { getQueryVector } from './openaiUtils';

/*async function performVectorSearch(query: string): Promise<any[]> {
    const queryVector = await getQueryVector(query);
   // const collection = await getDBCollection('memos');
    const agg = [
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
            '$match': {
                'score': { '$gte': 0.7 }
            }
        },
        {
            '$sort': { 'score': -1 }
        }
    ];
    //return await collection.aggregate<any>(agg).toArray();
}*/

//export { performVectorSearch };