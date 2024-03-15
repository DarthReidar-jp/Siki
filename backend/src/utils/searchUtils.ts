import mongoose from 'mongoose';
import { getQueryVector } from './openaiUtils';
const Page = mongoose.model('Page'); // 'Page'モデルがすでに定義されていると仮定

async function performVectorSearch(query: string): Promise<any[]> {
    const queryVector = await getQueryVector(query);
    // MongoDB Atlasのフルテキスト検索を利用するためのaggregateクエリを構築
    const agg = [
        {
            $search: {
                index: 'vector_index', // 使用する検索インデックスの名前
                compound: {
                    should: [{
                        vector: {
                            path: 'vector', // ベクトルデータを含むフィールドのパス
                            query: queryVector, // 検索クエリベクトル
                            score: { boost: { value: 1 } } // スコアブーストオプション
                        }
                    }]
                }
            }
        },
        {
            $project: { // 取得するフィールドを指定
                title: 1,
                content: 1,
                score: { $meta: 'searchScore' } // 検索スコア
            }
        },
    ];

    // Mongooseのaggregateメソッドを使用してクエリを実行
    const results = await Page.aggregate(agg);
    return results;
}

export { performVectorSearch };
