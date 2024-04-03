//fetchSearchResults.ts
import { Page } from './types';

export const fetchSearchResults = async (query: string): Promise<Page[]> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const url = `${backendUrl}search?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch search results');

    const searchResults: Page[] = await response.json();
    return searchResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error; // エラーをコンポーネントに伝播させる
  }
};
