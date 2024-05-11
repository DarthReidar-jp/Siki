export async function fetchChatsList() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${backendUrl}chat`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    const chatList = await response.json();
    return chatList;
}