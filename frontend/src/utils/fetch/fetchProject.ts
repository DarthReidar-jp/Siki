import { Project } from "../types/types";
import { fetchPagesConfig } from "../config";


const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const createNewProject = async (projectData:Project) => {
        const response = await fetch(`${backendUrl}project/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            throw new Error('Something went wrong with the request.');
        }
        const responseData = await response.json();
        console.log('プロジェクトを作成しました:', responseData);
        return responseData;
}



const defaltPageSize = fetchPagesConfig.defaltPageSize;
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