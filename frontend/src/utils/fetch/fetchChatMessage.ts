import { Message } from "../types/types";

const backendUrl = process.env.REACT_APP_BACKEND_URL
export const fetchChatAiMessage = async (inputText: string, messages: Message[], messageToSend: Message) => {
    const response = await fetch(`${backendUrl}chat`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            text: inputText,
            chatHistory: messages.length > 0 ? [...messages, messageToSend] : []
        }),
    });

    const responseData = await response.json();
    const aiMessageText = responseData.answer;
    const aiMessages: Message = {
        text: aiMessageText,
        timestamp: new Date().toISOString(),
        sender: 'ai'
    };
    return aiMessages;
};

export const fetchSaveMessage = async (chatId: string | null| undefined,messageToSend: Message,aiMessages:Message) => {
    const saveResponse = await fetch(`${backendUrl}chat/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          chatId,
          messages: [messageToSend, aiMessages]
        })
      });
      const saveData = await saveResponse.json();
      return saveData;
};

export const loadChatHistory = async (chatId: string|undefined) => {
    try {
        const response = await fetch(`${backendUrl}chat/${chatId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        });
        const chatHistory = await response.json();
        return chatHistory; // chatHistoryがmessagesプロパティを含むことを確認する
    } catch (error) {
        console.error('Failed to fetch chat history:', error);
        return null; // エラーが発生した場合はnullを返す
    }
};
