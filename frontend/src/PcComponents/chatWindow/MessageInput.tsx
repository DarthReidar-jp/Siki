import React, { useRef, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { MessageTextAreaProps } from '../../utils/types/types';

const MessageInput: React.FC<MessageTextAreaProps> = ({
  inputText,
  isLoading,
  onInputChange,
  onSubmit
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; 
      const maxHeight = 100; 
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`; 
    }
  }, [inputText]);

  return (
    <div className="w-full px-2">
      <form onSubmit={onSubmit} className="flex items-center">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={onInputChange}
          placeholder="Type your message here..."
          className="text-xxs flex-grow p-2 mr-2 rounded-lg bg-white placeholder-gray-400 border border-solid border-gray-400 resize-none overflow-auto"
          rows={1}
          style={{ minHeight: '40px', maxHeight: '150px' }} 
        />
        <button
          type="submit"
          className="text-xxs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
          disabled={isLoading}
        >
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
