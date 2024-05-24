import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../utils/types/types';

const ProjectsList = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}project/list`, { 
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();
    }, []);

    const formatTitle = (projectName: string) => {
        if (!projectName) return "No Title";
        return projectName.length > 15 ? `${projectName.substring(0, 15)}...` : projectName;
    };

    return (
        <div className="px-5 py-3">
            <p className="mb-1 text-sm text-gray-800">Project List</p>
            <ul>
                {projects.map((project) => (
                    <li key={project.projectId} className="px-4 py-1 hover:bg-gray-400 transition duration-300 cursor-pointer">
                        <Link to={`/project/${project.projectId}`} className="block text-xxs">
                            {formatTitle(project.projectName)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsList;