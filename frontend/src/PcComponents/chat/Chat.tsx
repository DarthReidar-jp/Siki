import React, { useState } from 'react';

interface Message {
  user: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // ローディング状態の管理

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);  // ロード開始
    const messageToSend: Message = { user: 'user', text: inputText };
    setMessages([...messages, messageToSend]);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}chat`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const reply = await response.json();
      console.log(reply);
      const serverMessage: Message = { user: 'AI', text: reply.text };
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsLoading(false);  // ロード終了
    setInputText('');
  };

  return (
    <div className="chat-container max-w-4xl mx-auto bg-gray-100 p-5 font-sans">
      <div className="message-area flex flex-col grow space-y-4 p-5 bg-white">
        {messages.map((message, index) => (
          <div key={index} className={`message flex ${message.user === 'user' ? 'justify-end' : 'justify-start'} bg-gray-200 shadow p-3 rounded-lg`}>
            <strong className={`font-bold ${message.user === 'user' ? 'text-white' : 'text-gray-800'}`}>{message.user === 'user' ? 'You' : 'AI'}:</strong>
            <span className={`ml-2 ${message.user === 'user' ? 'text-white' : 'text-gray-800'}`}>{message.text}</span>
          </div>
        ))}
        {isLoading && <div className="loading-message text-center">ロード中...</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full fixed bottom-0 left-0 p-3 bg-gray-100 shadow-inner">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-grow p-3 border-2 border-gray-300 rounded-full bg-gray-200 mr-3"
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>

  );
};

export default Chat;
