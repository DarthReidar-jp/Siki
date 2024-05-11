// SearchResults.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageList from './PageList';
//import './list.scss';
import { Page } from '../../utils/types/types';
import { fetchSearchResults } from '../../utils/fetch/fetchSearchResults'; // 適切なパスに修正してください

const SearchResults: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function performSearch() {
      const query = new URLSearchParams(location.search).get('query');
      if (!query) return;

      try {
        const results = await fetchSearchResults(query);
        setPages(results);
      } catch (error) {
        console.error("Error while fetching search results:", error);
      }
    }

    performSearch();
  }, [location.search]);

  return (
    <div className="px-1">
      <PageList pages={pages} />
    </div>
  );
};

export default SearchResults;
