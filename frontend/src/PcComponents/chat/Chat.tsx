import React, { useState } from 'react';
import './Chat.scss';  // 確認して、このパスが正しいことを保証してください

interface Message {
  user: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const messageToSend: Message = { user: 'user', text: inputText };
    setMessages([...messages, messageToSend]);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const reply = await response.json();
      const serverMessage: Message = { user: 'server', text: reply.text };
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInputText('');
  };

  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            <strong>{message.user === 'user' ? 'You' : 'Server'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="input-field"
        />
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
