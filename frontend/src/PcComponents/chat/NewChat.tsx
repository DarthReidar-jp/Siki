import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchChatAiMessage, fetchSaveMessage } from '../../utils/fetch/fetchChatMessage';
import { Message } from '../../utils/types/types';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);

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
            const aiMessages = await fetchChatAiMessage(inputText, messages, messageToSend);
            setMessages((prevMessages) => [...prevMessages, aiMessages]);
            const saveData = await fetchSaveMessage(chatId, messageToSend, aiMessages);
            if (!chatId) {
                setChatId(saveData.chatId);
            }
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
