import React from 'react';
import { MessageListProps } from '../../utils/types/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const formatAiText = (text: string) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, children }) => <p style={{ marginBottom: '0.7rem' }}>{children}</p>,
        strong: ({ node, children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
        h1: ({ node, children }) => <h1 style={{ fontSize: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{children}</h1>,
        h2: ({ node, children }) => <h2 style={{ fontSize: '0.8rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{children}</h2>,
        h3: ({ node, children }) => <h3 style={{ fontSize: '0.75rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{children}</h3>,
        hr: ({ node }) => <hr style={{ border: '1px solid #ccc', marginTop: '1rem', marginBottom: '1rem' }} />,
        a: ({ node, href, children }) => <a href={href} style={{ color: '#007bff' }} target="_blank" rel="noopener noreferrer">{children}</a>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};


const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => (
  <div className="flex-grow overflow-auto py-2 px-4">
    <div className="space-y-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-3/4 md:max-w-1/2 p-3 rounded-lg shadow-md text-xxs ${message.sender === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'}`}
          >
            {message.sender === 'ai' ? formatAiText(message.text) : message.text}
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

);

export default MessageList;
