
export const fetchPages = async (sort: string): Promise<any> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const url = `${backendUrl}?sort=${sort}`;
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
      throw error; // エラーを再スローして呼び出し元でキャッチできるようにする
    }
  };
  

  