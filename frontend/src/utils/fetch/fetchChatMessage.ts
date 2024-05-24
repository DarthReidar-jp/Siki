import { Message } from "../types/types";

interface ChatRequest {
    text: string;
    chatHistory: Message[];
    projectId?: string; 
}

interface SaveRequest {
    chatId: string | null | undefined;
    messages: Message[];
    projectId?: string; 
}


const backendUrl = process.env.REACT_APP_BACKEND_URL
export const fetchChatAiMessage = async (inputText: string, messages: Message[], messageToSend: Message,projectId?:string) => {
    const requestBody: ChatRequest = {
        text: inputText,
        chatHistory: messages.length > 0 ? [...messages, messageToSend] : []
    };

    // プロジェクトIDが存在する場合、リクエストボディに追加
    if (projectId) {
        requestBody.projectId = projectId;
    }

    const response = await fetch(`${backendUrl}chat`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(requestBody),
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

export const fetchSaveMessage = async (chatId: string | null | undefined, messageToSend: Message, aiMessages: Message, projectId?: string) => {
    const saveRequestBody: SaveRequest = {
        chatId,
        messages: [messageToSend, aiMessages]
    };

    if (projectId) {
        saveRequestBody.projectId = projectId;
    }

    const saveResponse = await fetch(`${backendUrl}chat/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(saveRequestBody)
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
        return chatHistory; 
    } catch (error) {
        console.error('Failed to fetch chat history:', error);
        return null;
    }
};
