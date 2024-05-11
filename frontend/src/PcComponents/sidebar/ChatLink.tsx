import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchChatsList } from "../../utils/fetch/fetchChatsList";
import { Chat } from '../../utils/types/types';

const ChatLink = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            const chatsListData = await fetchChatsList()
            setChats(chatsListData);
        };
        fetchChats();
    }, []);

    const formatTitle = (title: string) => {
        return title.length > 10 ? `${title.substring(0, 10)}...` : title;
    };

    return (
        <div>
            <button
                className="w-full px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer text-left"
                onClick={() => setIsOpen(!isOpen)}
            >Let's Chat
            </button>
            {isOpen && (
                <ul className="">
                    <li className="px-5 py-1 ps-10 hover:bg-gray-300 text-sm">
                        <Link to={'/chat'} className="block">
                            New Chat!
                        </Link>
                    </li>
                    {chats.map((chat) => (
                        <li key={chat.id} className="px-5 py-2  ps-10 hover:bg-gray-300 text-sm">
                            <Link to={`/chat/${chat.id}`} className="block text-sm">
                                {formatTitle(chat.title)}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatLink;
