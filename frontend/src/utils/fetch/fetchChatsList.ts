export async function fetchChatsList(projectId?: string) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Construct the URL based on whether projectId is provided
    const url = projectId ? `${backendUrl}chat?projectId=${projectId}` : `${backendUrl}chat`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch chat list');
    }

    const chatList = await response.json();
    return chatList;
}
