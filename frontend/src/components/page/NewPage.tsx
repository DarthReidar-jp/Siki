import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css'

const NewPage = () => {
  const [title, setTitle] = useState('');
  const contentRef = useRef<HTMLDivElement>(null); // contenteditable用のref
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (title.trim().length > 0) {
      const content = contentRef.current?.innerText || ''; // contenteditable領域のテキストを取得
      try {
        const response = await fetch('http://localhost:8000/api/page', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          // titleとcontenteditable領域から取得したテキストをlines配列として送信
          body: JSON.stringify({ title, lines: [title, content] }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Page created:', result);
          navigate(`/${result.page._id}`);
        } else {
          console.error('Failed to create page');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Enterキーでフォームを送信
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // フォームの送信を防ぐ
      handleSubmit(); // 送信処理を実行
    }
  };

  return (
    <div className="container">
      <div className="page">
        <div className='page-body'>
          <input
            className='title'
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            placeholder="タイトルを入力"
          />
          <div
            ref={contentRef}
            contentEditable
            className='content'
            onKeyDown={handleKeyDown}
          ></div>
        </div>
        <button onClick={handleSubmit}>送信</button>
      </div>
    </div>
  );
};

export default NewPage;
