export async function uploadJsonFile(uploadJsonData: string, projectId?: string) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // Construct the URL based on whether projectId is provided
  const url = projectId ? `${backendUrl}json?projectId=${projectId}` : `${backendUrl}json`;

  const response = await fetch(url, { 
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data:uploadJsonData }),
  });

  if (!response.ok) {
    throw new Error('ファイルの送信に失敗しました。');
  }

  return response;
}
