import React, { useState } from 'react';
import './Chat.scss';

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
    <div className="chat-container">
      <div className="message-area">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            <strong>{message.user === 'user' ? 'You' : 'AI'}:</strong> {message.text}
          </div>
        ))}
        {isLoading && <div className="loading-message">ロード中...</div>}  
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="input-field"
        />
        <button type="submit" className="submit-button" disabled={isLoading}>Send</button>  
      </form>
    </div>
  );
};

export default Chat;
