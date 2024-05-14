/* チャット履歴と質問文のクエリ文章を生成して
クエリと類似度が高い文章をMongoDBから取得
それら文章を元に回答を生成するのはこちら */
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { historyAwarePrompt, historyRetrievalPrompt } from "./prompt";
import { setupMongoDBCollection } from "./initializeVectorStore";
import { initializeRetriever } from "./initializeRetriever";
import { transformMessages, Message } from "./messageTransformer";

const temperature = 0.8;
const chatModel = new ChatOpenAI({
    modelName: process.env.OPENAI_CHAT_MODEL,
    temperature: temperature,
    openAIApiKey: process.env.OPENAI_API_KEY
});

async function generateResponseUsingRAGandHistory(chat_history: Message[], userId: string, userMessage: string, projectId?:string) {

    const chatHistory = transformMessages(chat_history);
    const collection = await setupMongoDBCollection();
    const retriever = await initializeRetriever(collection, userId, projectId);

    if (userMessage === undefined) {
        console.error("Error: ユーザーメッセージがありません.");
    } else {
        console.log("Query text:", userMessage);
    }

    //チャット履歴を考慮したドキュメント検索のchain
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
        llm: chatModel,
        retriever: retriever,
        rephrasePrompt: historyAwarePrompt,
    });
    //ドキュメントのリストを受け取り、それを言語モデルに渡して処理を行うためのチェーンを作成する関数
    const historyCombineDocsChain = await createStuffDocumentsChain({
        llm: chatModel,
        prompt: historyRetrievalPrompt,
        outputParser: new StringOutputParser(),
    });
    //　チャット履歴を考慮した検索とドキュメントをもとにした文章生成のchain
    const conversationalRetrievalChain = await createRetrievalChain({
        retriever: historyAwareRetrieverChain,
        combineDocsChain: historyCombineDocsChain,
    });

    const response = await conversationalRetrievalChain.invoke({
        chat_history: chatHistory,
        input: userMessage,
    });
    console.log("Response generated:", response);
    console.log("Response generated:", response.answer);
    return response;
}


export { generateResponseUsingRAGandHistory };
