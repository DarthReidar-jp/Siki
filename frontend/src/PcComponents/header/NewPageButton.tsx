// src/components/NewPageButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";

const NewPageButton = ({ projectId }:{projectId?:String|null}) => {
  // プロジェクトIDがある場合はそのIDに基づいたnewページのリンクを生成
  const newPageLink = projectId ? `/project/${projectId}/new` : '/new';

  return (
    <div>
      <Link to={newPageLink} className="w-10 h-10 px-2 py-2 mr-3 bg-white font-semibold text-lg rounded-full border hover:bg-gray-200 transition duration-300 flex items-center justify-center">
        <GoPlus />
      </Link>
    </div>
  );
};

export default NewPageButton;
