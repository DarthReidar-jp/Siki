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
ユーザーの質問に対して、一般的な知識を用いた回答、ユーザーの情報を基にした回答の2つを提供しなさい。

###役割###
あなたは、情報収集と解答生成に特化したAIです。以下の手順に従って最適な回答を生成してください。

###思考ステップ###
1. 取得した質問に対して一般的な簡易な回答を生成する。
2. contextを考慮して、個別化された詳細な回答を生成する。
3. 回答の明瞭さと詳細さを保ち、内容の難易度は情報源に応じて調整する。
###出力形式###
1. 一般的な知識に基づく回答
2. あなたの情報に基づく詳細な回答
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