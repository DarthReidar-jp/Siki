import { OpenAI } from "@langchain/openai";
import { HydeRetriever } from "langchain/retrievers/hyde";
import { HydePrompt } from "./prompt";

const temperature = 0.8;

const llm = new OpenAI({
    modelName: process.env.OPENAI_CHAT_MODEL,
    temperature: temperature,
    openAIApiKey: process.env.OPENAI_API_KEY
});

function hydeRetriever(vectorStore: any, userId: string, projectId?: string) {

    // projectIdが与えられた場合は、それをフィルターに追加
    const filter = projectId ? {projectId: projectId} : {userId: userId};
    // 選択されたインデックス名をコンソールに表示
    console.log(`Using filter name: ${filter}`);
    const hydeRetriever = new HydeRetriever({
        vectorStore,
        llm,
        promptTemplate: HydePrompt,
        k: 10,
        searchType: "similarity",
        filter: {
            preFilter:filter
        }
    });
    return hydeRetriever;
}

export { hydeRetriever }

