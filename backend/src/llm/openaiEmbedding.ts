import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY, 
  batchSize: 2048, 
  modelName: "text-embedding-3-small",
});

async function getPageVector(content: string): Promise<number[]> {
  const response = await embeddings.embedDocuments([content]);
  return response[0];
}

async function getQueryVector(inputText: string): Promise<number[]> {
  const response = await embeddings.embedDocuments([inputText]);
  return response[0];
}

export { getPageVector, getQueryVector };