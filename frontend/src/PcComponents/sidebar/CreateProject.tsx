import React from 'react';
import { Link } from 'react-router-dom';


const CreateProject = () => {
    return (
        <Link to={'/project/new'} className="block">
            <li className="px-5 py-1 text-sm hover:bg-gray-400 transition duration-300 cursor-pointer">
                Create Project
            </li>
        </Link>

    );
};

export default CreateProject;



