import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './list.scss';
import Sort from './Sort';
import PageList from './PageList';
import { Page } from '../../utils/types/types';
import { fetchPages } from './projectFetchPages';

const List: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [sort, setSort] = useState<string>('createdAsc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);
  const { projectId } = useParams<{ projectId: string | undefined }>();

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom && !isLoading && hasMoreData) {
        setCurrentPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, hasMoreData]);

  useEffect(() => {
    setCurrentPage(1);
    setHasMoreData(true);
  }, [sort]);

  useEffect(() => {
    const fetchAndSetPages = async () => {
      if (!hasMoreData || projectId === undefined) return;
      setIsLoading(true);
      try {
        const response = await fetchPages(projectId, sort, currentPage);
        setShouldDisplay(response.shouldDisplay);
        if (response.shouldDisplay) {
          if (currentPage === 1) {
            setPages(response.pages);
          } else {
            setPages(prev => [...prev, ...response.pages]);
          }
        } else {
          setPages([]); // データを表示しない
        }
        setHasMoreData(response.pages.length > 0);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetPages();
  }, [sort, currentPage, hasMoreData, projectId]);

  if (!projectId) {
    return <div className="text-center">Project ID is required.</div>;
  }

  return (
    <div className="px-20">
      <Sort sort={sort} onSortChange={(e) => setSort(e.target.value)} />
      {shouldDisplay ? (
        <PageList pages={pages} projectId={projectId} />
      ) : (
        <div className="text-center">You do not have permission to view these pages.</div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
