import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { hydeRetriever } from "./hydeRetriever";
import { cohereRerank } from "./cohereRerank";
import { initializeVectorStore } from "./initializeVectorStore";

function initializeRetriever(collection: any, userId: string) {
    const vectorStore = initializeVectorStore(collection);
    const hydeBaseRetriever = hydeRetriever(vectorStore,userId);
    const compressor = cohereRerank();
    const retriever = new ContextualCompressionRetriever({
        baseCompressor: compressor,
        baseRetriever: hydeBaseRetriever,
    });
    
    return retriever;
}

export { initializeRetriever }
