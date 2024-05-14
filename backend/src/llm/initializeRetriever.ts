import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { hydeRetriever } from "./hydeRetriever";
import { cohereRerank } from "./cohereRerank";
import { initializeVectorStore } from "./initializeVectorStore";

function initializeRetriever(collection: any, userId: string, projectId?:string) {
    const vectorStore = initializeVectorStore(collection,projectId);
    const hydeBaseRetriever = hydeRetriever(vectorStore,userId,projectId);
    const compressor = cohereRerank();
    const retriever = new ContextualCompressionRetriever({
        baseCompressor: compressor,
        baseRetriever: hydeBaseRetriever,
    });
    
    return retriever;
}

export { initializeRetriever }
