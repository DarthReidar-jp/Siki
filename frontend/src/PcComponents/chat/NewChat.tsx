import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchChatAiMessage, fetchSaveMessage } from '../../utils/fetch/fetchChatMessage';
import { Message } from '../../utils/types/types';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const location = useLocation();
    const projectId = extractProjectIdFromPath(location.pathname) || undefined;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!inputText.trim()) return;

        setIsLoading(true);
        const messageToSend: Message = {
            text: inputText,
            timestamp: new Date().toISOString(),
            sender: 'user'
        };

        setInputText('');
        setMessages([...messages, messageToSend]);
        try {
            const aiMessages = await fetchChatAiMessage(inputText, messages, messageToSend,projectId);
            setMessages((prevMessages) => [...prevMessages, aiMessages]);
            const saveData = await fetchSaveMessage(chatId, messageToSend, aiMessages,projectId);
            if (!chatId) {
                setChatId(saveData.chatId);
            }
            console.log(aiMessages);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col px-52">
            <MessageList messages={messages} isLoading={isLoading} />
            <MessageInput
                inputText={inputText}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Chat;
