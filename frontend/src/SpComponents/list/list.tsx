// list.tsx
import React, { useState, useEffect } from 'react';
import './list.scss';
import Sort from './Sort'; 
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from '../../utils/fetchPages';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');

  useEffect(() => {
    const fetchAndSetPages = async () => {
      try {
        const fetchedPages = await fetchPages(sort);
        setPages(fetchedPages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchAndSetPages();
  }, [sort]);

  return (
    <div>
      <Sort sort={sort} onSortChange={(e) => setSort(e.target.value)} /> 
      <PageList pages={pages} />
    </div>
  );
};

export default List;
