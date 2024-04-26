import { ChatOpenAI } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { SystemPrompt, contentPrompt } from "./promptUtils"

async function connectToMongoDB() {
    const client = new MongoClient(process.env.MONGODB_URI || "");
    await client.connect();
    console.log("MongoDB connected successfully.");
    return client;
}

async function setupMongoDBCollection(client:any) {
    const namespace = "Siki.pages";
    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);
    return collection;
}

async function initializeVectorSearch(collection:any, userId:string) {
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

    return vectorStore.asRetriever({
        k: 3,
        searchType: "similarity",
        filter: {
            preFilter: {
                userId: userId
            }
        }
    });
}

async function generateResponseUsingRAG(userId: string, userMessage: string) {
    let client;
    try {
        client = await connectToMongoDB();
        const collection = await setupMongoDBCollection(client);
        const retriever = await initializeVectorSearch(collection, userId);

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", SystemPrompt],
            ["human", contentPrompt],
        ]);
        const llm = new ChatOpenAI({ 
            modelName: "gpt-3.5-turbo-0125", 
            temperature: 0, 
            openAIApiKey: process.env.OPENAI_API_KEY });
        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt,
            outputParser: new StringOutputParser(),
        });

        const retrievedDocs = await retriever.getRelevantDocuments(userMessage);
        console.log("Documents retrieved:", retrievedDocs.length);
        const response = await ragChain.invoke({
            question: userMessage,
            context: retrievedDocs,
        });
        console.log("Response generated:", response);
        return response;
    } catch (error) {
        console.error("Error during the document retrieval or generation process:", error);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log("MongoDB connection closed.");
        }
    }
}

export { generateResponseUsingRAG };
