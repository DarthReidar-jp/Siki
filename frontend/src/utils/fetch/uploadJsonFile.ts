export async function uploadJsonFile(uploadJsonData:any) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${backendUrl}/json`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uploadJsonData }),
    });
  
    if (!response.ok) {
      throw new Error('レスポンスが返ってきません');
    }
  
    return response;
  }
  