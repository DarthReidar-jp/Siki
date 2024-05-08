import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // useParams フックをインポート
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from './projectFetchPages';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const { projectId } = useParams<{ projectId: string | undefined }>();


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
      if (!hasMoreData || projectId === undefined) return;  // projectId が undefined の場合、フェッチをスキップ

      try {
        setIsLoading(true);
        const fetchedPages = await fetchPages(projectId,sort,currentPage);
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
  }, [sort, currentPage, hasMoreData,projectId]);

  if (!projectId) {
    return <div className="text-center">Project ID is required.</div>;
  }

  return (
    <div className="px-20">
      <Sort sort={sort} onSortChange={(e) => {
        setSort(e.target.value);
      }} />
      <PageList pages={pages} projectId={projectId} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
