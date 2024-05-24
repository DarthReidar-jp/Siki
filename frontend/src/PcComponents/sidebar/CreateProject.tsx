import React from 'react';
import { Link } from 'react-router-dom';
import { IoCreate } from "react-icons/io5";


const CreateProject = () => {
    return (
        <Link to={'/project/new'} className="block">
            <li className="flex items-center px-5 py-1 text-sm hover:bg-gray-400 transition duration-300 cursor-pointer">
                <IoCreate className='mr-1 text-sm'/>
                Create Project
            </li>
        </Link>

    );
};

export default CreateProject;



