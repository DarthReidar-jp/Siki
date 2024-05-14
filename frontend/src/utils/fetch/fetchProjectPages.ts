import { fetchPagesConfig } from "../config";

const defaltPageSize = fetchPagesConfig.defaltPageSize;

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchProjectPages = async (projectId: string | undefined, sort: string, page: number, pageSize: number = defaltPageSize): Promise<any> => {
  const url = `${backendUrl}project/?sort=${sort}&page=${page}&projectId=${projectId}&pageSize=${pageSize}`;
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
  const data = await response.json();
  return data;
};