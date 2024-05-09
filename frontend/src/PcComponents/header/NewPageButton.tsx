import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoPlus } from "react-icons/go";

const NewPageButton = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // 正規表現を使用してURLからプロジェクトIDを抽出（末尾の/がなくても対応）
  const match = /project\/([^\/]*)/.exec(path);
  const projectId = match ? match[1] : null;

  // プロジェクトIDがある場合はそのIDに基づいたnewページのリンクを生成
  const newPageLink = projectId ? `/project/${projectId}/editor/new` : '/new';

  return (
    <div>
      <Link to={newPageLink} className="w-10 h-10 px-2 py-2 mr-3 bg-white font-semibold text-lg rounded-full border hover:bg-gray-200 transition duration-300 flex items-center justify-center">
        <GoPlus />
      </Link>
    </div>
  );
};

export default NewPageButton;
