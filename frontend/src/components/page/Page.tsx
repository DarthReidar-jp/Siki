// Page.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Page.css';

interface Memo {
  _id: string;
  title: string;
  content: string;
  score?: number;
}

interface Params {
  [key: string]: string | undefined;
}

const Page: React.FC = () => {
  const [memo, setMemo] = useState<Memo | null>(null);
  const { id } = useParams<Params>();
  const navigate = useNavigate();


  const fetchMemo = useCallback(async () => { // useCallbackフックでfetchMemo関数をメモ化
    try {
      const response = await fetch(`http://localhost:8000/api/page/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMemo(data);
    } catch (error) {
      console.error('Failed to fetch memo:', error);
    }
  }, [id]); // IDが変わるときだけfetchMemo関数を再作成

  useEffect(() => {
    fetchMemo();
  }, [id, fetchMemo]); // fetchMemo関数を依存配列に含める
  
  const handleContentEdit = async (newContent: string) => {
    if (memo) {
      try {
        await fetch(`http://localhost:8000/api/page/${memo._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: memo.title, content: newContent })
        });
        console.log('自動保存しました');
      } catch (error) {
        console.error('保存中のエラー:', error);
      }
    }
  };

  const saveChanges = useCallback(async () => {
    if (memo) {
      try {
        await fetch(`http://localhost:8000/api/page/${memo._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memo)
        });
      } catch (error) {
        console.error('保存中のエラー:', error);
      }
    }
  }, [memo]); // memoを依存配列に追加
  
  useEffect(() => {
    return () => {
      saveChanges();
    };
  }, [saveChanges]); // saveChangesを依存配列に追加
  

  const handleDelete = async () => {
    if (memo) {
      try {
        await fetch(`http://localhost:8000/api/page/delete/${memo._id}`, {
          method: 'POST'
        });
        navigate('/'); // リダイレクト
      } catch (error) {
        console.error('削除中のエラー:', error);
      }
    }
  };

  return (
    <div className="container">
      {memo ? (
        <div className="page">
          <div className="page-body">
            <input
              className="title"
              type="text"
              value={memo.title}
              onChange={(e) => setMemo({ ...memo, title: e.target.value })}
            />
            <div
              className="content"
              contentEditable
              onBlur={(e) => handleContentEdit(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: memo.content }}
            />
          </div>
          <button className="custom-btn" onClick={handleDelete}>
            削除
          </button>
        </div>
      ) : (
        <div>No memo found.</div>
      )}
    </div>
  );
};

export default Page;