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
      textarea.style.height = 'auto'; // 一旦高さをリセット
      const maxHeight = 80; // 最大高さ (px)
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`; // 新しい高さを設定
    }
  }, [inputText]);

  return (
    <div className="w-full pb-2 px-4">
      <form onSubmit={onSubmit} className="flex items-center">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={onInputChange}
          placeholder="Type your message here..."
          className="text-xxs flex-grow p-2 mr-2 rounded-lg bg-white placeholder-gray-400 border border-gray-800 resize-none overflow-auto"
          rows={1}
          style={{ minHeight: '20px', maxHeight: '80px' }}  // 最小高さと最大高さをCSSで設定
        />
        <button
          type="submit"
          className="text-xxs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
          disabled={isLoading}
        >
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
