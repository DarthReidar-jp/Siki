import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewProject } from "../../utils/fetch/fetchProject";
import { Project } from "../../utils/types/types";


const NewProject: React.FC = () => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [isPublic, setIsPublic] = useState('true');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');

        const projectData: Project = {
            projectId: projectId,
            projectName: projectName,
            isPublic: isPublic === 'true'
        };

        try {
            const responseData = await createNewProject(projectData);
            navigate(`/project/${responseData.projectId}`);
        } catch (error: unknown) {
            console.error('エラーが発生しました:', error);
        }
    };
    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">新規プロジェクトの作成</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="projectId" className="block text-gray-700 mb-2">プロジェクトID</label>
                <input
                    type="text"
                    id="projectId"
                    name="projectId"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
    
            <div>
                <label htmlFor="projectName" className="block text-gray-700 mb-2">プロジェクト名</label>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
    
            <div>
                <label htmlFor="isPublic" className="block text-gray-700 mb-2">公開/非公開</label>
                <select
                    id="isPublic"
                    name="isPublic"
                    value={isPublic}
                    onChange={(e) => setIsPublic(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="false">非公開</option>
                    <option value="true">公開</option>
                </select>
            </div>
    
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                作成
            </button>
        </form>
    </div>
    
    );
};

export default NewProject;
