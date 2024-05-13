// src/components/Header.tsx
import React from 'react';
import NewPageButton from './NewPageButton';
import VectorSearchBar from './VectorSearchBar';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";

const Header = () => {
  const location = useLocation();
  const projectId = extractProjectIdFromPath(location.pathname);

  return (
    <header className='flex justify-between items-center fixed top-0 z-50 w-full bg-white bg-opacity-40 backdrop-blur-sm p-2'>
      <div className='flex justify-center items-center flex-grow'>
        <NewPageButton projectId={projectId} />
        <VectorSearchBar />
      </div>
    </header>
  );
};

export default Header;
