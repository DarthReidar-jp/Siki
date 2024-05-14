import mongoose from 'mongoose';
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

async function setupMongoDBCollection() {
    const collection = mongoose.connection.db.collection('pages');
    return collection;
}

const openAIEmbeddingConfig = {
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 2048,
    modelName: process.env.OPENAI_EMBEDDING_MODEL,
};


function initializeVectorStore(collection: any, projectId?: string) {
    // 条件によって使用するインデックス名を選択
    const indexName = projectId ? "project_vector_index" : "vector_index";
    
    // 選択されたインデックス名をコンソールに表示
    console.log(`Using index name: ${indexName}`);

    const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings(openAIEmbeddingConfig), {
        collection,
        indexName: indexName,
        textKey: "content",
        embeddingKey: "vector",
    });

    return vectorStore;
}


export { setupMongoDBCollection, initializeVectorStore }
