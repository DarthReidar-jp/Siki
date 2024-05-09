import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProject: React.FC = () => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [isPublic, setIsPublic] = useState('true');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const projectData = {
            projectId,
            projectName,
            isPublic: isPublic === 'true' // 文字列を boolean に変換
        };
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        try {
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
            navigate(`/${responseData.projectId}`);
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">新規プロジェクトの作成</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="projectId" className="block text-gray-700 mb-2">プロジェクトID</label>
                    <input
                        type="text"
                        id="projectId"
                        name="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-gray-700 mb-2">プロジェクト名</label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="isPublic" className="block text-gray-700 mb-2">公開/非公開</label>
                    <select
                        id="isPublic"
                        name="isPublic"
                        value={isPublic} // 型を明示的に指定
                        onChange={(e) => setIsPublic(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="false">非公開</option>
                        <option value="true">公開</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    作成
                </button>
            </form>
        </div>
    );
};

export default NewProject;
