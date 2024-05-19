import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { IoIosChatboxes } from "react-icons/io";

const ChatButton = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div>
            {!showChat && ( 
                <button className="fixed right-7 bottom-7 z-50 bg-sky-400 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-110" onClick={toggleChat}>
                    <IoIosChatboxes />
                </button>
            )}
            {showChat && (
                <ChatWindow onClose={() => {
                    toggleChat(); 
                }} />
            )}
        </div>
    );
}

export default ChatButton;
