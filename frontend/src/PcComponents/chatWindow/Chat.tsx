import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchChatAiMessage, fetchSaveMessage, loadChatHistory } from '../../utils/fetch/fetchChatMessage';
import { Message } from '../../utils/types/types';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";

const Chat: React.FC<{ initialChatId?: string | null }> = ({ initialChatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string | null>(initialChatId ?? null);
    const location = useLocation();
    const projectId = extractProjectIdFromPath(location.pathname) || undefined;

    useEffect(() => {
        setChatId(initialChatId ?? null); 
    }, [initialChatId]);

    useEffect(() => {
        const loadMessages = async () => {
            if (chatId) {
                setIsLoading(true);
                try {
                    const chatHistory = await loadChatHistory(chatId);
                    setMessages(chatHistory.messages);
                } catch (error) {
                    console.error('Failed to fetch chat history:', error);
                }
                setIsLoading(false);
            }
        };
        loadMessages();
    }, [chatId]); 

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            const aiMessages = await fetchChatAiMessage(inputText, messages, messageToSend, projectId);
            setMessages((prevMessages) => [...prevMessages, aiMessages]);
            const saveData = await fetchSaveMessage(chatId, messageToSend, aiMessages, projectId);
            if (!chatId) {
                setChatId(saveData.chatId);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <MessageList messages={messages} isLoading={isLoading} />
            <MessageInput
                inputText={inputText}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default Chat;
