import React, { useState, useEffect } from 'react';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from '../../utils/fetchPages';
import { FaSpinner } from 'react-icons/fa';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('UpdateAsc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true); // 追加データがあるかどうか

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom && !isLoading && hasMoreData) { // データがない場合はリクエストを行わない
        setCurrentPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, hasMoreData]);

  // ソートオプションが変わったときにページ番号をリセット
  useEffect(() => {
    setCurrentPage(1);
    setHasMoreData(true); // ソートが変更された場合は、再びデータがあると仮定
  }, [sort]);

  useEffect(() => {
    const fetchAndSetPages = async () => {
      if (!hasMoreData) return; // データがもうない場合はフェッチをスキップ

      try {
        setIsLoading(true);
        const fetchedPages = await fetchPages(sort, currentPage);
        if (currentPage === 1) {
          setPages(fetchedPages);
        } else {
          setPages(prev => [...prev, ...fetchedPages]);
        }
        setHasMoreData(fetchedPages.length > 0); // 返されたページの数が0なら、これ以上データはない
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetPages();
  }, [sort, currentPage, hasMoreData]);

  return (
    <div className="px-24">
      <Sort sort={sort} onSortChange={(e) => {
        setSort(e.target.value);
      }} />
      <PageList pages={pages} />
      {isLoading && <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
      </div>}
    </div>
  );
};

export default List;
