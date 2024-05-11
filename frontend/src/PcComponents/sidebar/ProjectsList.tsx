import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../utils/types/types';

const ProjectsList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}project/list`, { 
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setProjects(data);
        };

        fetchChats();
    }, []);

    const formatTitle = (title: string) => {
        return title.length > 10 ? `${title.substring(0, 10)}...` : title;
    };

    return (
        <div>
            <button
                className="w-full px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer text-left"
                onClick={() => setIsOpen(!isOpen)}
            >Projects
            </button>
            {isOpen && (
                <ul className="">
                    <li className="px-5 py-1 ps-10 hover:bg-gray-300 text-sm">
                        <Link to={'/project/new'} className="block">
                            Create New Project
                        </Link>
                    </li>
                    {projects.map((project) => (
                        <li key={project.id} className="px-5 py-2  ps-10 hover:bg-gray-300 text-sm">
                            <Link to={`/project/${project.id}`} className="block text-sm">
                                {formatTitle(project.title)}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectsList;


/* {projects.map((project) => (
    <li key={project.id} className="px-5 py-2  ps-10 hover:bg-gray-300 text-sm">
        <Link to={`/chat/${project.id}`} className="block text-sm">
            {formatTitle(project.title)}
        </Link>
    </li>
))} */