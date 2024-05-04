
export const loadEditorState = async (id: any) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await fetch(`${backendUrl}page/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // このヘッダーを追加
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch page');
  }
  const jsonData = await response.json();
  const editorStateString = JSON.stringify(jsonData.editorState)
  return editorStateString;
};