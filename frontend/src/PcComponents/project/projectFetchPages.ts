export const fetchPages = async (projectId:string, sort: string, page: number,pageSize: number = 50): Promise<any> => {
    try {
      const url = `http://localhost:8000/api/project/?sort=${sort}&page=${page}&projectId=${projectId}&pageSize=${pageSize}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const pages = await response.json();
      return pages;
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error; 
    }
  };
  