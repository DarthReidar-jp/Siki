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

    const indexName = projectId ? "project_vector_index" : "vector_index";
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
