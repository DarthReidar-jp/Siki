
export const loadEditorState = async (id: any) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await fetch(`${backendUrl}page/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch page');
  }
  const jsonData = await response.json();
  const editorStateString = JSON.stringify(jsonData.root)
  return editorStateString;
};