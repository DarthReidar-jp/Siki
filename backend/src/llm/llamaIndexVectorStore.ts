/* /* /* /* /* eslint-disable turbo/no-undeclared-env-vars 
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import {
    Settings,
    MongoDBAtlasVectorSearch,
    SimpleMongoReader,
    storageContextFromDefaults,
    SimpleNodeParser,
    VectorStoreIndex,
    OpenAIEmbedding
} from "llamaindex";

Settings.nodeParser = new SimpleNodeParser({
    chunkSize: 30,
  });

  Settings.embedModel = new OpenAIEmbedding({
    model: "text-embedding-ada-002",
    apiKey:"",
  });

async function saveToMongo() {
    const collection = mongoose.connection.db.collection('pages');
    const client = mongoose.connection.getClient()
    return {collection,client};
}

async function loadAndIndex() {
    const mongoUri = "";
    const client = new MongoClient(mongoUri);
    const reader = new SimpleMongoReader(client);
    const documents = await reader.loadData("LlamaIndex", "pages", [
        "content",
    ]);

    // create Atlas as a vector store
    const vectorStore = new MongoDBAtlasVectorSearch({
        mongodbClient: client,
        dbName: "LlamaIndex",
        collectionName: "chunks", // this is where your embeddings will be stored
        indexName: "vector", // this is the name of the index you will need to create
    });

    // now create an index from all the Documents and store them in Atlas
    const storageContext = await storageContextFromDefaults({ vectorStore });
    await VectorStoreIndex.fromDocuments(documents, { storageContext });
    await client.close();
}

loadAndIndex()


async function query() {
    const client = new MongoClient(process.env.MONGODB_URI!);

    const store = new MongoDBAtlasVectorSearch({
        mongodbClient: client,
        dbName: "LlamaIndex",
        collectionName: "pages",
        indexName: "vector",
    });

    const index = await VectorStoreIndex.fromVectorStore(store);
    const retriever = index.asRetriever({ similarityTopK: 20 });
    const queryEngine = index.asQueryEngine({ retriever });
    const result = await queryEngine.query({
        query: "未来社会と意味の境界について教えて",
    });
    console.log(result.response);
    await client.close();
}
 */