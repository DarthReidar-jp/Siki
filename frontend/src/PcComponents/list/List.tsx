import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types';
import { fetchPages } from '../../utils/fetchPages';
import { FaSpinner } from 'react-icons/fa';

interface FetchPagesError {
  message: string;
}

interface InitialData {
  pages: Page[][];
  pageParams: number[];
}

const List: React.FC = () => {
  const [sort, setSort] = useState<string>('UpdateAsc');
  const [initialData, setInitialData] = useState<InitialData | undefined>(undefined);

  const {
    isLoading,
    error,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
  }: InfiniteQueryObserverResult<Page[], FetchPagesError> = useInfiniteQuery<Page[], FetchPagesError>(
    ['pages', sort],
    ({ pageParam = 1 }) => fetchPages(sort, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const hasMoreData = lastPage.length > 0;
        if (!hasMoreData) return undefined;
        return allPages.length + 1;
      },
      initialData: initialData,
    }
  );

  const handleScroll = useCallback(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;
    if (nearBottom && !isLoading && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoading, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // ページ読み込み時のみデータをフェッチ
    if (!data && !error) {
      fetchNextPage({ pageParam: 1 });
    }
  }, [sort, fetchNextPage, data, error]);
  
  useEffect(() => {
    if (data) {
      setInitialData({ pages: data.pages, pageParams: data.pageParams as number[] });
    }
  }, [data]);
  
  return (
    <div className="px-20">
      <Sort sort={sort} onSortChange={(e) => setSort(e.target.value)} />
      <PageList pages={data ? data.pages.flat() : []} />
      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default List;