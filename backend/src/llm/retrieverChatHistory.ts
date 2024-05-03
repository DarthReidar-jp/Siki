/* チャット履歴と質問文のクエリ文章を生成して
クエリと類似度が高い文章をMongoDBから取得
それら文章を元に回答を生成するのはこちら */

import mongoose from 'mongoose';
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAI,ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { HydeRetriever } from "langchain/retrievers/hyde";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { searchSystemPrompt, searchcontentPrompt, RAGSystemPrompt, RAGcontentPrompt } from "../llm/promptUtils";

// MongoDBコレクションのセットアップ
async function setupMongoDBCollection() {
    const collection = mongoose.connection.db.collection('pages');
    return collection;
}
// MongoDBのベクトル検索とリトリバーの初期化
function initializeVectorSearch(collection: any, userId: string) {
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
    const llm = new OpenAI();
    const retriever = new HydeRetriever({
        vectorStore,
        llm,
        k: 3,
        searchType: "similarity",
        filter: {
            preFilter: {
                userId: userId
            }
        }
    });

    return retriever;
}

//パラメータ
const temperature = 0.8;

interface Message {
    text: string;
    timestamp: string;
    sender: 'user' | 'ai';
}
// チャット履歴を基にクエリを生成するためのPromptを設定
const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ["system", searchSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["user", searchcontentPrompt],
]);

// 検索結果を元に回答を生成するPromptを設定
const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    ["system", RAGSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["user", RAGcontentPrompt],
]);


async function generateResponseUsingRAGandHistory(chat_history: Message[], userId: string, userMessage: string) {
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

        if (userMessage === undefined) {
            console.error("Error: ユーザーメッセージがありません.");
        } else {
            console.log("Query text:", userMessage);
        }

        const chatModel = new ChatOpenAI({
            modelName: process.env.OPENAI_CHAT_MODEL,
            temperature: temperature,
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
    }
}


export { generateResponseUsingRAGandHistory };
