import React, { useState, useEffect } from 'react';
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
    <div className="col-md-10 main-content">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {memos.length ? (
              memos.map(memo => (
                <div className="col-lg-2 col-md-4 mb-3" key={memo._id}>
                  <div className="memo d-flex flex-column">
                    <div className="memo-body flex-fill">
                      <h5 className="memo-title">{memo.title}</h5>
                      <p className="memo-content">{memo.content}</p>
                      {memo.score && (
                        <p className="memo-content score">
                          Score: {memo.score.toFixed(5)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No memos found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
