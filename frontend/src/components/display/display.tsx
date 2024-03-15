import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './display.css'; 


interface Page {
  _id: string;
  title: string;
  content: string;
}

const Display: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc'); 


  useEffect(() => {
    fetchPages(sort);
  }, [sort]);

  const fetchPages = async (sort: string) => {
    try {
      // ソートオプションをクエリパラメータに追加
      const url = `http://localhost:8000/api?sort=${sort}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const pages = await response.json();
      setPages(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className="main-content">
      <select onChange={handleSortChange} value={sort}>
        <option value="createdAsc">作成日順</option>
        <option value="updatedDesc">更新日順</option>
        <option value="titleAsc">タイトル (A-Z)</option>
        <option value="titleDesc">タイトル (Z-A)</option>
      </select>
      {pages.length ? (
        pages.map(page => (
          <Link to={`/${page._id}`} key={page._id}>
            <div className="page">
              <div className="page-body">
                <h5 className="page-title">{page.title}</h5>
                <p className="page-content">{page.content}</p>
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
