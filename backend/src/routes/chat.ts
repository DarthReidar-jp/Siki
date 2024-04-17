import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { verifyToken } from '../utils/verifyToken';
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";



const router = express.Router();

// LangChainとGPT-4の設定
const chat = new ChatOpenAI({
    modelName: "gpt-4-turbo-preview",
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY, // 環境変数からAPIキーを取得
});


// メッセージを受け取るエンドポイント
router.post('/', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: 'No token provided or invalid token' });
        }
        const userId = decoded.userId;
        const userMessage = req.body.text;

        if (!userMessage) {
            return res.status(400).json({ error: 'No message provided' });
        }
        const client = new MongoClient(process.env.MONGODB_URI || "");
        const namespace = "Siki.pages";
        const [dbName, collectionName] = namespace.split(".");
        const collection = client.db(dbName).collection(collectionName);

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

        const retriever = vectorStore.asRetriever({ k: 6, searchType: "similarity" });
        const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
        const llm = new ChatOpenAI({ modelName: "gpt-4", temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY });
        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt,
            outputParser: new StringOutputParser(),
        });
        const retrievedDocs = await retriever.getRelevantDocuments(
            userMessage
        );
        const response =await ragChain.invoke({
            question: userMessage,
            context: retrievedDocs,
        });
        res.json({ text: response });
    } catch (error) {
        console.error('Error processing the message:', error);
        res.status(500).json({ error: 'Error processing your message' });
    }
});

export default router;
