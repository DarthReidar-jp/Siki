// components/List.tsx
import React, { useState, useEffect, useCallback } from 'react';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from '../../utils/fetchPages';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    setIsLoading(true);
    setCurrentPage(prev => prev + 1);
  }, [isLoading]);

  useEffect(() => {
    const fetchAndSetPages = async () => {
      try {
        const fetchedPages = await fetchPages(sort, currentPage);
        setPages(prev => [...prev, ...fetchedPages]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchAndSetPages();
  }, [sort, currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="main-content">
      <Sort sort={sort} onSortChange={(e) => setSort(e.target.value)} />
      <PageList pages={pages} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
