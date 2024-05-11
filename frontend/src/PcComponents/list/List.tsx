import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types/types';
import { fetchPages } from '../../utils/fetch/fetchPages';
import { FaSpinner } from 'react-icons/fa';
import { FetchPagesError,InitialData } from '../../utils/types/types';

const List: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>('UpdateAsc');
  const [initialData, setInitialData] = useState<InitialData | undefined>(undefined);
  //ページデータのフロントエンドへのキャッシュの保存
  const {
    isLoading,
    error,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
  }: InfiniteQueryObserverResult<Page[], FetchPagesError> = useInfiniteQuery<Page[], FetchPagesError>(
    ['pages', sortOrder],
    ({ pageParam = 1 }) => fetchPages(sortOrder, pageParam),
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
    const totalPageHeight = document.documentElement.scrollHeight;
    const currentScrollPosition = window.innerHeight + window.scrollY;
    const threshold = 100;
    const isNearBottomOfPage = currentScrollPosition >= totalPageHeight - threshold;
    const shouldFetchNextPage = isNearBottomOfPage && !isLoading && !isFetching && hasNextPage;
    if (shouldFetchNextPage) {
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
    if (!data && !error) {
      fetchNextPage({ pageParam: 1 });
    }
  }, [sortOrder, fetchNextPage, data, error]);

  useEffect(() => {
    if (data) {
      setInitialData({ pages: data.pages, pageParams: data.pageParams as number[] });
    }
  }, [data]);

  const renderLoadingIndicator = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  };

  const renderError = () => {
    return <div>Error: {error?.message}</div>;
  };

  return (
    <div className="px-20">
      <Sort sort={sortOrder} onSortChange={(e) => setSortOrder(e.target.value)} />
      <PageList pages={data ? data.pages.flat() : []} />
      {(isLoading || isFetching) && renderLoadingIndicator()}
      {error && renderError()}
    </div>
  );
};

export default List;