import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";

interface Message {
  text: string;
  timestamp: string;
  sender: 'user' | 'ai';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // ローディング状態の管理
  const [chatId, setChatId] = useState<string | null>(null);  // Chat ID state

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);  // ロード開始
    const messageToSend: Message = {
      text: inputText,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    setInputText('');
    setMessages([...messages, messageToSend]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}chat`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          text: inputText,
          chatHistory: messages.length > 0 ? [...messages, messageToSend] : []
        }),
      });

      const responseData = await response.json();
      const aiMessageText = responseData.answer;
      const aiMessages: Message = {
        text: aiMessageText,
        timestamp: new Date().toISOString(),
        sender: 'ai'
      };
      setMessages((prevMessages) => [...prevMessages, aiMessages]);

      // Save conversation to backend
      const saveResponse = await fetch(`${backendUrl}chat/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          chatId,
          messages: [messageToSend, aiMessages]
        })
      });
      const saveData = await saveResponse.json();
      if (!chatId) {
        setChatId(saveData.chatId); // Set chatId from backend if it's the first time
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsLoading(false);  // ロード終了
  };

  return (
    <div className="flex flex-col px-52 ">
      <div className="flex-grow mb-20 px-1 pt-8 pb-10">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-3/4 p-4 rounded-lg shadow-md ${message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 pb-4 px-52">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow p-3 mr-3 rounded-full bg-white placeholder-gray-400  border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
