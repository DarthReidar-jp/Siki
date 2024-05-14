import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

//HyDEを使ってよりポテンシャルの高いクエリ文章の作成
const searchHydePrompt = `
質問をより具体的にしてください。
###質問###
{question}
`
const HydePrompt = PromptTemplate.fromTemplate(
    searchHydePrompt
);


// Hydeのクエリ文章とチャット履歴を基にクエリベクトルを生成する
const geneQueryPrompt = `
質問: "{input}" 
`;

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", geneQueryPrompt],
]);


//RAGの生成プロンプト
const RAGSystemPrompt = `
inputに対して、contextとRequirementsに基づき返信をしなさい
###Requirements###
・inputにcontextの内容が不適切だと感じたら、contextを無視しなさい
・inputの内容に関係のあるcontextの部分を使用しなさい
・URLや[]等の文字装飾は無視しなさい
・チャットの履歴で関係のある文脈を使用してもよい
`;

const RAGcontentPrompt = `
###input###
{input}

###context###
{context}
`;

// 検索結果を元に回答を生成するPromptを設定
const historyRetrievalPrompt = ChatPromptTemplate.fromMessages([
    ["system", RAGSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["user", RAGcontentPrompt],
]);

export { HydePrompt, historyAwarePrompt, historyRetrievalPrompt }