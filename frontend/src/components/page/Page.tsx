import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Page.css';

// ページデータの型定義
interface PageData {
  _id: string;
  title: string;
  content: string;
  lines: string[];
}

const Page: React.FC = () => {
  const [page, setPage] = useState<PageData | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement | null>(null); // contentEditableの大枠を参照するためのref

  const fetchPage = useCallback(async () => {
    if (!id) { 
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
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // ページの更新処理
  const handleUpdate = async () => {
    if (!page || !contentRef.current) {
      console.error("Page is null or content ref is null, can't update.");
      return;
    }
    const lines = Array.from(contentRef.current.children).map(child => child.textContent || '');
    try {
      const response = await fetch(`http://localhost:8000/api/page/${page._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: page.title,
          lines: lines,
        }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update page');
      }
      const updatedPage = await response.json();
      setPage(updatedPage);
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
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
    {page ? (
      <div className="page">
        <div className="page-body">
          <h2 contentEditable suppressContentEditableWarning={true} onBlur={(e) => setPage(prev => prev ? { ...prev, title: e.target.innerText } : null)}>
            {page.title}
          </h2>
          <div ref={contentRef} className="editable-lines" contentEditable suppressContentEditableWarning={true}>
            {page.lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <button className="custom-btn" onClick={handleUpdate}>更新</button>
        <button className="custom-btn" onClick={handleDelete}>削除</button>
      </div>
    ) : (
      <div>No page found.</div>
    )}
  </div>
  );
};
export default Page;
