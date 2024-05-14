import React from 'react';
import { IoIosSend } from "react-icons/io";
import { MessageInputProps } from '../../utils/types/types';


const MessageInput: React.FC<MessageInputProps> = ({
  inputText,
  isLoading,
  onInputChange,
  onSubmit
}) => (
  <div className="fixed bottom-0 left-0 right-0 pb-4 px-52">
    <form onSubmit={onSubmit} className="flex">
      <input
        type="text"
        value={inputText}
        onChange={onInputChange}
        placeholder="Type your message here..."
        className="flex-grow p-3 mr-3 rounded-full bg-white placeholder-gray-400 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
);

export default MessageInput;
