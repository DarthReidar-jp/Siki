import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

//HyDEを使ってよりポテンシャルの高いクエリ文章の作成
const searchHydePrompt = `
質問を元に類似する情報を検索します。
ユーザーの質問を具体的にして類似度検索が行いやすいようにしてください。
文章は簡潔にまとめてください。
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
ユーザーの質問に対して、contextを基にした最適な回答を思考ステップに従って作成しなさい。

###役割###
あなたは、情報収集と質問回答に特化したAIです。

###思考ステップ###
1. 取得した質問の意図を理解する。
2. contextと質問の内容の整合性を確認する。
3. 整合性が取れる内容であればcontextを考慮して、詳細な回答を作成する。
4. 整合性が取れない内容であれば、contextを無視して回答を作成する。
5. 回答は明瞭さと詳細さを保ち、内容の難易度は情報源に応じて調整する。
6. 参考にした情報のタイトルを最後に示す。

###出力形式###
1.質問に対する回答
2.参考にした情報
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