
const SystemPrompt = `
    contextに基づいて質問に答えます。口調や言葉遣いをcontextの文章のものに似せてください
    contextに情報がなくわからない場合はユーザーにアドバイスを与えてください
    過去のチャット履歴に関する事であれば過去のチャットを参照して下さい
    `;

const contentPrompt = `
    Question: {question} 
    Context: {context} 
    `;

export { SystemPrompt, contentPrompt }