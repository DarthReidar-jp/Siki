import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

const client = new MongoClient(process.env.MONGODB_URI || "");
const namespace = "Siki.pages";
const [dbName, collectionName] = namespace.split(".");
const collection = client.db(dbName).collection(collectionName);

const userIdFilter = {
    preFilter: {
        userId: "特定のUserId"
    }
};

const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 2048,
    modelName: "text-embedding-3-small",
}), {
    collection,
    indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
    textKey: "content", // The name of the collection field containing the raw content. Defaults to "text"
    embeddingKey: "vector", // The name of the collection field containing the embedded text. Defaults to "embedding"
});

const resultOne = await vectorStore.similaritySearch("Hello world", 1);
console.log(resultOne);
