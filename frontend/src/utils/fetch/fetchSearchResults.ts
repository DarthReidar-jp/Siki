import { Page } from '../types/types';

export const fetchSearchResults = async (query: string, projectId?: string|null): Promise<Page[]> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const url = projectId
    ? `${backendUrl}search?query=${encodeURIComponent(query)}&projectId=${projectId}`
    : `${backendUrl}search?query=${encodeURIComponent(query)}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch search results');

    const searchResults: Page[] = await response.json();
    return searchResults;
};

