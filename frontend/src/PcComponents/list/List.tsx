import React, { useState, useEffect } from 'react';
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

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom && !isLoading) {
        setCurrentPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  // ソートオプションが変わったときにページ番号をリセット
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  useEffect(() => {
    const fetchAndSetPages = async () => {
      try {
        setIsLoading(true);
        const fetchedPages = await fetchPages(sort, currentPage);
        if (currentPage === 1) {
          setPages(fetchedPages);
        } else {
          setPages(prev => [...prev, ...fetchedPages]);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetPages();
  }, [sort, currentPage]);

  return (
    <div className="main-content">
      <Sort sort={sort} onSortChange={(e) => {
        setSort(e.target.value);
      }} />
      <PageList pages={pages} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
