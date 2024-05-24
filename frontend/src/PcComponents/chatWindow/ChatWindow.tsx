import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";
import ChatHistoryList from './ChatHistoryList';
import Chat from './Chat';
import { IoIosCloseCircleOutline } from "react-icons/io";


const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const location = useLocation();
    const projectId = extractProjectIdFromPath(location.pathname) || undefined;
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <div className="fixed bottom-5 right-5 w-80 h-96 z-50 bg-white rounded-lg bg-opacity-10 backdrop-blur-xl flex flex-col p-2 border border-gray-300"
             style={{ resize: 'both', overflow: 'hidden', minWidth: '320px', minHeight: '200px', maxWidth: '600px', maxHeight: '500px' }}>
            <div className="flex justify-between items-center  pb-1">
                <ChatHistoryList projectId={projectId} onSelectChat={setSelectedChatId}/>
                <button className="ps-3 pb-1" onClick={onClose}>
                    <IoIosCloseCircleOutline />
                </button>
            </div>
            <Chat initialChatId={selectedChatId} />
        </div>
    );
};

export default ChatWindow;
