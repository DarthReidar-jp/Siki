import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageList from './PageList';
import './list.scss';
import { Page } from '../../utils/types/types';
import { fetchSearchResults } from '../../utils/fetch/fetchSearchResults'; // 適切なパスに修正してください

const SearchResults: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const location = useLocation();
  const [projectId, setProjectId] = useState<string | undefined>(undefined); // projectIdの初期状態をnullで設定

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const projId = queryParams.get('projectId') || undefined;
    setProjectId(projId); // 状態更新

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
  }, [location.search]); // location.searchが変わったときに検索を再実行

  return (
    <div className="px-20">
      <PageList pages={pages} projectId={projectId} />
    </div>
  );
};

export default SearchResults;
