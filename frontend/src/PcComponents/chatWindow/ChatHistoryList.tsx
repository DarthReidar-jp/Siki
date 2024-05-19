import React, { useState, useEffect } from 'react';
import { fetchChatsList } from "../../utils/fetch/fetchChatsList";
import { Chat } from '../../utils/types/types';

const ChatLink = ({ projectId, onSelectChat }: { projectId?: string, onSelectChat: (chatId: string) => void }) => {
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
        return title.length > 10 ? `${title.substring(0, 10)}...` : title;
    };
    const handleSelectChat = (chatId: string) => {
        console.log(chatId);
        onSelectChat(chatId);
        setIsOpen(false);  // メニューを閉じる
    };

    return (
        <div className="relative">
            <button
                className="text-xxxs bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-1 shadow-sm "
                onClick={() => setIsOpen(!isOpen)}
            >
                chat履歴
            </button>
            {isOpen && (
                <ul className="z-50 absolute top-full left-0 min-w-max bg-white shadow-lg mt-1 max-h-36 overflow-y-auto border rounded-lg border-gray-200">
                    {chats.map((chat) => (
                        <li key={chat.id} className="px-3 py-2 hover:bg-gray-100 text-xs whitespace-nowrap">
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

export default ChatLink;
