
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const saveEditorState = async (serializedState: any, projectId?: string) => {
  let url = `${backendUrl}page/`;
  if (projectId) {
    url = `${backendUrl}project/newpage/${projectId}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(serializedState),
  });
  
  const result = await response.json();
  return result;
};


export const updateEditorState = async (serializedState: any,id: any) => {
  const response = await fetch(`${backendUrl}page/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(serializedState),
  });
  const result = await response.json();
  console.log('ページの更新:', result);
};

export const deletePage = async (id: any) => {
  const response = await fetch(`${backendUrl}page/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  if (!response.ok) {
    throw new Error('ページの削除に失敗しました');
  }
}

export const loadEditorState = async (id: any, projectId?: string) => {
  const url = projectId 
      ? `${backendUrl}page/${id}?projectId=${projectId}` 
      : `${backendUrl}page/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch page');
  }
  const jsonData = await response.json();
  const editorStateString = JSON.stringify(jsonData.editorState);
  return editorStateString;
};
