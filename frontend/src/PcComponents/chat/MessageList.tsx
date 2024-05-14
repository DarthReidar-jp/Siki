import React from 'react';
import { MessageListProps } from '../../utils/types/types';

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => (
  <div className="flex-grow mb-20 px-1 pt-8 pb-10">
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-3/4 p-4 rounded-lg shadow-md ${message.sender === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'}`}
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
);

export default MessageList;
