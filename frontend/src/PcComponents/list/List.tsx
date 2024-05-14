import { fetchProjectPages } from '../../utils/fetch/fetchProjectPages';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // projectId を取得するために使用
import { useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types/types';
import { fetchPages} from '../../utils/fetch/fetchPages'; // 適切な関数をインポート
import { FaSpinner } from 'react-icons/fa';
import { FetchPagesError, InitialData } from '../../utils/types/types';
import { useVerifyProjectAccess } from "../../utils/useVerifyProjectAccess";

const List: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>('UpdateAsc');
  const [initialData, setInitialData] = useState<InitialData | undefined>(undefined);
  const { projectId } = useParams<{ projectId?: string }>();
  const access = useVerifyProjectAccess(projectId);

  const {
    isLoading,
    error,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
  }: InfiniteQueryObserverResult<Page[], FetchPagesError> = useInfiniteQuery<Page[], FetchPagesError>(
    ['pages', projectId, sortOrder], // キーに projectId を含める
    ({ pageParam = 1 }) => projectId ? fetchProjectPages(projectId, sortOrder, pageParam) : fetchPages(sortOrder, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const hasMoreData = lastPage.length > 0;
        return hasMoreData ? allPages.length + 1 : undefined;
      },
      initialData,
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
    return () => window.removeEventListener('scroll', handleScroll);
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

  const renderLoadingIndicator = () => (
    <div className="flex justify-center items-center min-h-screen">
      <FaSpinner className="text-4xl text-blue-500 animate-spin" />
    </div>
  );

  const renderError = () => (
    <div>Error: {error?.message}</div>
  );

  if (!access.shouldDisplay) {
    return <div>非公開プロジェクトです。</div>;
  }

  return (
    <div className="px-20">
      <Sort sort={sortOrder} onSortChange={(e) => setSortOrder(e.target.value)} />
      <PageList pages={data ? data.pages.flat() : []} projectId={projectId} />
      {(isLoading || isFetching) && renderLoadingIndicator()}
      {error && renderError()}
    </div>
  );
};

export default List;
