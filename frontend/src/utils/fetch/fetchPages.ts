import { fetchPagesConfig } from "../config";

const defaltPageSize = fetchPagesConfig.defaltPageSize;

export const fetchPages = async (sort: string, page: number, pageSize: number = defaltPageSize): Promise<any> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  try {
    const url = `${backendUrl}?sort=${sort}&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    const pages = await response.json();
    console.log(pages);
    return pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error; 
  }
};
