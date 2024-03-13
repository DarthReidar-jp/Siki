import React, { useState } from 'react';
import './Page.css'

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    // バックエンドへ送信するデータ
    const pageData = {
      title,
      content,
    };

    try {
      // バックエンドにデータを送信
      const response = await fetch('http://localhost:8000/api/page', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        // 送信成功時の処理
        const result = await response.json();
        console.log('Page created:', result);
        // 成功後、フォームをクリアするなどの処理をここに追加
      } else {
        // エラー処理
        console.error('Failed to create page');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="page">
          <div className='page-body'>
            <input
              className='title'
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className='content'
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button type="submit">Create Page</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
