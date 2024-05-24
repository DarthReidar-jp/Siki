import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageList from './PageList';
import './list.scss';
import { Page } from '../../utils/types/types';
import { fetchSearchResults } from '../../utils/fetch/fetchSearchResults'; 

const SearchResults: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const location = useLocation();
  const [projectId, setProjectId] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const projId = queryParams.get('projectId') || undefined;
    setProjectId(projId); 

    async function performSearch() {
      if (!query) return;
      try {
        const results = await fetchSearchResults(query, projId);
        setPages(results);
      } catch (error) {
        console.error("Error while fetching search results:", error);
      }
    }

    performSearch();
  }, [location.search]); 

  return (
    <div className="px-20">
      <PageList pages={pages} projectId={projectId} />
    </div>
  );
};

export default SearchResults;
