import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './display.css'; // CSSスタイルは適宜調整してください

// ページデータの型定義（適宜調整してください）
interface Page {
  _id: string;
  title: string;
  content: string;
  score?: number;
}

const Display: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      // バックエンドのエンドポイントに対してGETリクエストを送信
      const response = await fetch('http://localhost:8000/api', {
        method: 'GET',
        credentials: 'include', // クッキーを含むリクエストを行う
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const pages = await response.json(); // レスポンスボディをJSONとしてパース
      setPages(pages); // 取得したページデータを状態にセット
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  return (
    <div className="main-content">
      {pages.length ? (
        pages.map(page => (
          <Link to={`/${page.title}`} key={page._id}>
            <div className="page">
              <div className="page-body">
                <h5 className="page-title">{page.title}</h5>
                <p className="page-content">{page.content}</p>
                {page.score && (
                  <p className="page-content score">
                    Score: {page.score.toFixed(5)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="no-pages">
          <p>No pages found.</p>
        </div>
      )}
    </div>
  );
};

export default Display;
