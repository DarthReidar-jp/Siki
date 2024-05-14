import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchChatAiMessage, fetchSaveMessage,loadChatHistory } from '../../utils/fetch/fetchChatMessage';
import { Message } from '../../utils/types/types';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";

const LegacyChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { chatId } = useParams<{ chatId: string }>();
    const location = useLocation();
    const projectId = extractProjectIdFromPath(location.pathname) || undefined;

    useEffect(() => {
        setIsLoading(true);
        const fetchChatHistory = async () => {
            try {
                const chatHistory = await loadChatHistory(chatId);
                setMessages(chatHistory.messages);
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            }
            setIsLoading(false);
        };
        if (chatId) {
            fetchChatHistory();
        }
    }, [chatId]); 

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
        setMessages(prevMessages => [...prevMessages, messageToSend]);
        try {
            const aiMessages = await fetchChatAiMessage(inputText, messages, messageToSend,projectId);
            setMessages((prevMessages) => [...prevMessages, aiMessages]);
            await fetchSaveMessage(chatId, messageToSend, aiMessages);
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

export default LegacyChat;
