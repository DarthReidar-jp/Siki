import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { hydeRetriever } from "./hydeRetriever";
import { cohereRerank } from "./cohereRerank";
import { initializeVectorStore } from "./initializeVectorStore";

function initializeRetriever(collection: any, userId: string, projectId?:string) {
    const vectorStore = initializeVectorStore(collection,projectId);

    //select Retriever
    //const baseRetriever = vectorStore.asRetriever();
    const baseRetriever = hydeRetriever(vectorStore,userId,projectId);
    
    // select Compressor
    const compressor = cohereRerank(); 

    // create compression retriever
    const retriever = new ContextualCompressionRetriever({
        baseCompressor: compressor,
        baseRetriever: baseRetriever,
    });
    
    return retriever;
}

export { initializeRetriever }
