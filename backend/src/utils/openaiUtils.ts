import { OpenAI,ClientOptions} from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY as ClientOptions);

async function getMemoVector(content: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: content,
  });

  return response.data[0].embedding;
}

async function getQueryVector(inputText: string): Promise<number[]> {

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: inputText,
  });

  return response.data[0].embedding;
}

export { getMemoVector, getQueryVector };