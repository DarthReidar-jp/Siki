import { Project } from "../types/types";


const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const createNewProject = async (projectData:Project) => {
        const response = await fetch(`${backendUrl}project/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            throw new Error('Something went wrong with the request.');
        }
        const responseData = await response.json();
        console.log('プロジェクトを作成しました:', responseData);
        return responseData;
}