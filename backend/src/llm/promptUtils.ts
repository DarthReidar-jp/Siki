//検索文の生成プロンプト
const searchSystemPrompt = `
これまでの会話履歴を反映して、質問を言語化し、ベクトル検索に適した形に整えてください。
以下の質問を基に検索文を生成してください。
`;

const searchcontentPrompt = `
質問: "{input}" 
`;

//RAGの生成プロンプト
const RAGSystemPrompt = `
以下の質問とコンテキストに基づいて適切な返信を生成してください。
提供されたコンテキストが不適切と感じられる場合は、そのコンテキストを無視し、独自の推論に基づいて回答してください。
文章は適宜改行を入れるなど、読みやすいように校正してください。
`;

const RAGcontentPrompt = `
コンテキスト: "{context}"をもとに質問: "{input}"に応えます。
しかし、コンテキストの中には質問の意図とは違うものも含まれる場合があるので、その場合は無視をしてあなたの知識に基づいて返信して下ださい

`;


export { searchSystemPrompt,searchcontentPrompt,RAGSystemPrompt, RAGcontentPrompt }