import mongoose from 'mongoose';
import { ChatOpenAI } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import  { searchSystemPrompt,searchcontentPrompt,RAGSystemPrompt, RAGcontentPrompt } from "./promptUtils";

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ["system",searchSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["user", searchcontentPrompt],
]);

const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    ["system", RAGSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["user",  RAGcontentPrompt],
]);

interface Message {
    text: string;
    timestamp: string;
    sender: 'user' | 'ai';
}


async function setupMongoDBCollection() {
    const collection = mongoose.connection.db.collection('pages'); 
    return collection;
}

async function initializeVectorSearch(collection: any, userId: string) {
    try {
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
        console.log("Vector search initialized successfully.");
        return vectorStore.asRetriever({
            k: 3,
            searchType: "similarity",
            filter: {
                preFilter: {
                    userId: userId
                }
            }
        });
    } catch (error) {
        console.error("Failed to initialize vector search:", error);
        throw error;
    }
}

async function generateResponseUsingRAGandHistory(chat_history: Message[], userId: string, userMessage: string) {
    let client;
    try {
        const chatHistory = chat_history.map((msg: Message) => {
            if (msg.sender === 'user') {
                return new HumanMessage(msg.text);
            } else if (msg.sender === 'ai') {
                return new AIMessage(msg.text);
            }
            return new AIMessage("Unknown message type received.");
        }).filter(msg => msg !== undefined);

        const collection = await setupMongoDBCollection();
        const retriever = await initializeVectorSearch(collection, userId);

        // クエリの内容をログに出力
        if (userMessage === undefined) {
            console.error("Error: userMessage.text is undefined.");
        } else {
            console.log("Query text:", userMessage);
        }

        const chatModel = new ChatOpenAI({
            modelName: "gpt-3.5-turbo-0125",
            temperature: 0.8,
            openAIApiKey: process.env.OPENAI_API_KEY
        });

        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm: chatModel,
            retriever: retriever,
            rephrasePrompt: historyAwarePrompt,
        });

        const historyAwareCombineDocsChain = await createStuffDocumentsChain({
            llm: chatModel,
            prompt: historyAwareRetrievalPrompt,
            outputParser: new StringOutputParser(),
        });

        const conversationalRetrievalChain = await createRetrievalChain({
            retriever: historyAwareRetrieverChain,
            combineDocsChain: historyAwareCombineDocsChain,
        });

        // 入力を確認してからレスポンスを生成
        if (userMessage) {
            const response = await conversationalRetrievalChain.invoke({
                chat_history: chatHistory,
                input: userMessage,
            });
            console.log("Response generated:", response);
            return response;
        } else {
            throw new Error("User message text is undefined");
        }
    } catch (error) {
        console.error("Error during the document retrieval or generation process:", error);
        throw error;

    } finally {

    }
}


export { generateResponseUsingRAGandHistory };
