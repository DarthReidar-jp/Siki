import React from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";
import { ProjectIdProps } from '../../utils/types/types';

const NewPageButton: React.FC<ProjectIdProps>  = ({ projectId })  => {
  const newPageLink = projectId ? `/project/${projectId}/new` : '/new';

  return (
    <div>
      <Link to={newPageLink} 
      className="flex items-center justify-center w-7 h-7 px-2 py-2 mr-3 bg-white font-semibold text-lg rounded-full border hover:bg-gray-200 transition duration-300 ">
        <GoPlus />
      </Link>
    </div>
  );
};

export default NewPageButton;
