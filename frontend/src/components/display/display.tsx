import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Linkコンポーネントをインポート
import './display.css'; // この行を追加

// Memo型の定義
interface Memo {
  _id: string;
  title: string;
  content: string;
  score?: number;
}

const Display: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api'); // APIのURLに応じて変更してください
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error('Failed to fetch memos:', error);
    }
  };
  return (
    <div className="main-content">
        {memos.length ? (
          memos.map(memo => (
            <Link to={`/${memo._id}`} key={memo._id}>
              <div className="memo">
                <div className="memo-body">
                  <h5 className="memo-title">{memo.title}</h5>
                  <p className="memo-content">{memo.content}</p>
                  {memo.score && (
                    <p className="memo-content score">
                      Score: {memo.score.toFixed(5)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="">
            <p>No memos found.</p>
          </div>
        )}
      </div>
  );
};

export default Display;
