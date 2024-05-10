import { CohereRerank } from "@langchain/cohere";

function cohereRerank() {
    const cohereRerank = new CohereRerank({
        apiKey: process.env.COHERE_API_KEY,
        model: "rerank-multilingual-v3.0",
        topN: 3
    });
    return cohereRerank
}

export {cohereRerank}
