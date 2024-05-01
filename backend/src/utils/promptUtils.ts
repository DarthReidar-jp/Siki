//検索文の生成プロンプト
const searchSystemPrompt = `
これまでの会話履歴を反映して、質問を言語化し、ベクトル検索に適した形に整えてください。以下の質問を基に検索文を生成してください。
`;

const searchcontentPrompt = `
質問: "{input}" 
`;

//RAGの生成プロンプト
const RAGSystemPrompt = `
以下の質問とコンテキストに基づいて適切な返信を生成してください。提供されたコンテキストが不適切と感じられる場合は、そのコンテキストを無視し、独自の推論に基づいて回答してください。
`;

const RAGcontentPrompt = `
質問: "{input}"
コンテキスト: "{context}"
`;


export { searchSystemPrompt,searchcontentPrompt,RAGSystemPrompt, RAGcontentPrompt }