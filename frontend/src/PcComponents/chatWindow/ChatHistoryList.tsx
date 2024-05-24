import React, { useState, useEffect } from 'react';
import { fetchChatsList } from "../../utils/fetch/fetchChatsList";
import { Chat } from '../../utils/types/types';

const ChatHistoryList = ({ projectId, onSelectChat }: { projectId?: string, onSelectChat: (chatId: string) => void }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            const chatsListData = await fetchChatsList(projectId);
            setChats(chatsListData);
        };
        fetchChats();
    }, [projectId]);

    const formatTitle = (title: string) => {
        return title.length > 20 ? `${title.substring(0, 20)}...` : title;
    };
    const handleSelectChat = (chatId: string) => {
        onSelectChat(chatId);
        setIsOpen(false);  
    };

    return (
        <div className="relative">
            <button
                className="text-xxxs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                chat履歴
            </button>
            {isOpen && (
                <ul className="z-50 absolute top-full left-0 min-w-max max-w-36 bg-white mt-1 py-2 max-h-48 overflow-y-auto rounded">
                    {chats.map((chat) => (
                        <li key={chat.id} className="px-2 py-1 hover:bg-gray-100 text-xxxs whitespace-nowrap">
                            <button onClick={() => handleSelectChat(chat.id)}>
                                {formatTitle(chat.title)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatHistoryList;
