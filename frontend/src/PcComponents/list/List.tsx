// list.tsx
import React, { useState, useEffect } from 'react';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from '../../utils/fetchPages';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');

  useEffect(() => {
    const fetchAndSetPages = async () => {
      try {
        let cachedPages = loadFromLocalStorage('pages');
        if (!cachedPages) {
          const fetchedPages = await fetchPages(sort);
          setPages(fetchedPages);
          saveToLocalStorage('pages', fetchedPages);
        } else {
          setPages(cachedPages);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchAndSetPages();
  }, [sort]);

  return (
    <div className="main-content">
      <Sort sort={sort} onSortChange={(e) => {
        setSort(e.target.value);
        localStorage.removeItem('pages');  // ソート順が変更されたらキャッシュをクリア
      }} />
      <PageList pages={pages} />
    </div>
  );
};

export default List;
