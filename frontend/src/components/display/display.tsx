import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Linkコンポーネントをインポート
import './display.css'; // この行を追加

// page型の定義
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
      const response = await fetch('http://localhost:8000/api'); // APIのURLに応じて変更してください
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    }
  };
  return (
    <div className="main-content">
        {pages.length ? (
          pages.map(page => (
            <Link to={`/${page._id}`} key={page._id}>
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
          <div className="">
            <p>No pages found.</p>
          </div>
        )}
      </div>
  );
};

export default Display;
