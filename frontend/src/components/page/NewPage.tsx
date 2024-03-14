import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css'

const NewPage = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim().length > 0) {
      e.preventDefault(); // フォームの送信を防ぐ
      try {
        const response = await fetch('http://localhost:8000/api/page', {
          method: 'POST',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title}),
        });
        if (response.ok) {
          // 送信成功時の処理
          const result = await response.json();
          console.log('Page created:', result);
          // navigateの引数を修正
          navigate(`/${result.page._id}`); // 修正: 正しいページIDに基づくURLにリダイレクト
        } else {
          // エラー処理
          console.error('Failed to create page');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
            onKeyDown={handleKeyDown} // 修正部分
            placeholder="タイトルを入力"
          />
          <textarea
            className='content'
            placeholder="コンテンツを入力"
          />
        </div>
      </div>
    </div>   
  );
};

export default NewPage;
