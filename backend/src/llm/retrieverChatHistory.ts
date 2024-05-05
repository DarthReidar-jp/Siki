/* チャット履歴と質問文のクエリ文章を生成して
クエリと類似度が高い文章をMongoDBから取得
それら文章を元に回答を生成するのはこちら */
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { historyAwarePrompt ,historyAwareRetrievalPrompt } from "../llm/promptUtils";
import { setupMongoDBCollection, initializeVectorStore } from "./initializeVectorStore";
import {transformMessages, Message } from "./messageTransform";

//パラメータ
const temperature = 0.8;

async function generateResponseUsingRAGandHistory(chat_history: Message[], userId: string, userMessage: string) {
 
        const chatHistory = transformMessages(chat_history);
        const collection = await setupMongoDBCollection();
        const retriever = await initializeVectorStore(collection, userId);

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

        //チャット履歴を考慮したドキュメント検索のchain
        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm: chatModel,
            retriever: retriever,
            rephrasePrompt: historyAwarePrompt,
        });
        //ドキュメントのリストを受け取り、それを言語モデルに渡して処理を行うためのチェーンを作成する関数
        const historyAwareCombineDocsChain = await createStuffDocumentsChain({
            llm: chatModel,
            prompt: historyAwareRetrievalPrompt,
            outputParser: new StringOutputParser(),
        });

        const conversationalRetrievalChain = await createRetrievalChain({
            retriever: historyAwareRetrieverChain,
            combineDocsChain: historyAwareCombineDocsChain,
        });

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
}


export { generateResponseUsingRAGandHistory };
