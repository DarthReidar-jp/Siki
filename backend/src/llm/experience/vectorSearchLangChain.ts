//タスク 
//Langchainを使ってMongoDB AtlasVectorSearchを導入する試験

import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from 'mongoose';
import { OpenAIEmbeddings } from "@langchain/openai";

function setupMongoDBCollection() {
    const collection = mongoose.connection.db.collection('pages');
    return collection;
}
function initializeVectorSearch(collection: any, userId: string) {
     const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 2048,
        modelName: "text-embedding-3-small",
    }), {
        collection: collection,
        indexName: "vector_index",
        textKey: "content",
        embeddingKey: "vector",
    });
    return vectorStore;
}

async function similaritySearchMongoDB(userId: string,query:string) {
    const vectorStore = initializeVectorSearch(setupMongoDBCollection(),userId)
    const resultOne = await vectorStore.maxMarginalRelevanceSearch(query, {
        k: 4,
        fetchK: 20, 
        filter: {
            preFilter: {
                userId: userId
            }
        }
      });
    console.log(resultOne);
}
