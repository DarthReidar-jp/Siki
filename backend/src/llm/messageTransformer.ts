import { HumanMessage, AIMessage } from "@langchain/core/messages";

interface Message {
    text: string;
    timestamp: string;
    sender: 'user' | 'ai';
}

function transformMessages(chatHistory: Message[]) {
    return chatHistory.map((msg: Message) => {
        if (msg.sender === 'user') {
            return new HumanMessage(msg.text);
        } else if (msg.sender === 'ai') {
            return new AIMessage(msg.text);
        }
        return new AIMessage("Unknown message type received.");
    }).filter(msg => msg !== undefined);
}

export { transformMessages, Message };
