import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";
import ChatHistoryList from './ChatHistoryList';
import NewChat from './NewChat';

const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const location = useLocation();
    const projectId = extractProjectIdFromPath(location.pathname) || undefined;
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <div className="fixed bottom-5 right-5 w-80 h-96 z-50 bg-white rounded-lg bg-opacity-10 backdrop-blur-xl flex flex-col p-3 border border-gray-300">
            <div className="flex justify-between items-center">
                <ChatHistoryList projectId={projectId} onSelectChat={setSelectedChatId}/>
                <button className="text-xl leading-none px-3 py-1 bg-transparent" onClick={onClose}>×</button>
            </div>
            <NewChat initialChatId={selectedChatId} />
        </div>
    );
};

export default ChatWindow;
