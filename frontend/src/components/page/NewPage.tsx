import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.length > 0) {
      // エンターキーが押された時のみ処理を実行
      try {
        const response = await fetch('http://localhost:8000/api/page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }) // contentは含まない
        });
        const data = await response.json();

        // URLを新しいメモのIDで更新
        navigate(`/${data._id}`);
      } catch (error) {
        console.error('Error creating new page:', error);
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
            onKeyPress={handleKeyPress} // エンターキーを検出するイベントハンドラを追加
            placeholder="タイトルを入力"
          />
          <textarea
            className='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="コンテンツを入力"
          />
        </div>
      </div>
    </div>   
  );
};

export default NewPage;
