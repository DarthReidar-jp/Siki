/* チャット履歴と質問文のクエリ文章を生成して
クエリと類似度が高い文章をMongoDBから取得
それら文章を元に回答を生成するのはこちら */

import mongoose from 'mongoose';
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HydeRetriever } from "langchain/retrievers/hyde";
import { HydePrompt } from "../llm/promptUtils";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
//import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import { CohereRerank } from "@langchain/cohere";

const temperature = 0.8;

// MongoDBコレクションのセットアップ
async function setupMongoDBCollection() {
    const collection = mongoose.connection.db.collection('pages');
    return collection;
}
// MongoDBのベクトルストアとリトリバーの初期化
function initializeVectorStore(collection: any, userId: string) {
    const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 2048,
        modelName: "text-embedding-3-small",
    }), {
        collection,
        indexName: "vector_index",
        textKey: "content",
        embeddingKey: "vector",
    });

    const llm = new OpenAI({
        modelName: process.env.OPENAI_CHAT_MODEL,
        temperature: temperature,
        openAIApiKey: process.env.OPENAI_API_KEY
    });
    //HyDEを使ったRetrieverの関数
    const hydeRetriever = new HydeRetriever({
        vectorStore,
        llm,
        promptTemplate:HydePrompt,
        k: 10,
        searchType: "similarity",
        filter: {
            preFilter: {
                userId: userId
            }
        }
    });

    //CohereRerankで取得したドキュメントのランク付けをした
    const cohereRerank = new CohereRerank({
        apiKey: process.env.COHERE_API_KEY, // Default
        model: "rerank-english-v2.0", // Default
        topN:3
      });
    //ドキュメントを圧縮するやつ
    //const baseCompressor = LLMChainExtractor.fromLLM(llm);
    
    //リランクをするretrieverのやつ
    const retriever = new ContextualCompressionRetriever({
        baseCompressor:cohereRerank,
        baseRetriever: hydeRetriever,
      });

    return retriever;
}

export { setupMongoDBCollection,initializeVectorStore}
