import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Page.css';

// ページデータの型定義
interface PageData {
  _id: string;
  title: string;
  content: string;
}

const Page: React.FC = () => {
  const [page, setPage] = useState<PageData | null>(null);
  // 編集中のタイトルとコンテンツを保持するためのステート
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const { id } = useParams<{ id: string }>(); // 正しくパラメータを取得
  const navigate = useNavigate();

  const fetchPage = useCallback(async () => {
    if (!id) { // idがundefinedでないことを確認
      console.error("Page ID is undefined, can't fetch.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/page/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }
      const data = await response.json();
      setPage(data);
      setEditTitle(data.title);
      setEditContent(data.content);
    } catch (error) {
      console.error(error);
    }
  }, [id]); // titleが変更された時にfetchPageを再生成

  useEffect(() => {
    fetchPage();
  }, [fetchPage]); // useEffectの依存関係リストにfetchPageを追加

  // ページの更新処理
  const handleUpdate = async () => {
    if (!page) {
      console.error("Page is null, can't update.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/page/${page._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update page');
      }
      const updatedPage = await response.json();
      setPage(updatedPage);
      // 更新成功後、適宜アクション（例：通知表示など）
    } catch (error) {
      console.error(error);
    }
  };

  // ページの削除
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/page/${page?._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      navigate('/display'); // 削除後にdisplayページへリダイレクト
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {page ? (
        <div className="page">
          <div className="page-body">
            <input
              className="title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
          <button className="custom-btn" onClick={handleUpdate}>
            更新
          </button>
          <button className="custom-btn" onClick={handleDelete}>
            削除
          </button>
        </div>
      ) : (
        <div>No page found.</div>
      )}
    </div>
  );
};

export default Page;
