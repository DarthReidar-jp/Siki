// Display.tsx
import React, { useState, useEffect } from 'react';
import SortSelect from './SortSelect';
import PageList from './PageList';
import { Page } from '../../types';
import './sp-display.scss';


const Display: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');

  useEffect(() => {
    fetchPages(sort);
  }, [sort]);

  const fetchPages = async (sort: string) => {
    try {
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

  return (
    <div className="sp-content">
      <SortSelect sort={sort} onSortChange={(e) => setSort(e.target.value)} />
      <PageList pages={pages} />
    </div>
  );
};

export default Display;
