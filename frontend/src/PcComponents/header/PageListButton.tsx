import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectIdProps } from '../../utils/types/types';

const PageListButton: React.FC<ProjectIdProps> = ({ projectId }) => (
    <Link to={projectId ? `/project/${projectId}` : "/"} className="block hover:bg-gray-200 transition duration-300 p-1">
        <div className='font-semibold text-sm'>
            {projectId ? projectId : "My Page"}
        </div>
    </Link>
);


export default PageListButton;
