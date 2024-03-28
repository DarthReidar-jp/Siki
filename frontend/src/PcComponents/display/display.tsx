// Display.tsx
import React, { useState, useEffect } from 'react';
import './display.css';
import SortSelect from './SortSelect';
import PageList from './PageList';
import { Page } from '../../utils/types'; 

const Display: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc'); 

  useEffect(() => {
    fetchPages(sort);
  }, [sort]);

  const fetchPages = async (sort: string) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const url = `${backendUrl}?sort=${sort}`;
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

  return (
    <div className="main-content">
    <SortSelect sort={sort} onSortChange={(e) => setSort(e.target.value)} />
    <PageList pages={pages} />
  </div>
  );
};

export default Display;
