

export const loadEditorState = async (id:any) => {
    const response = await fetch(`http://localhost:8000/api/rich/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    const data = await response.json();
    console.log(data.root);
    const Json = JSON.stringify(data.root)
    console.log(Json)
    return Json;
  };