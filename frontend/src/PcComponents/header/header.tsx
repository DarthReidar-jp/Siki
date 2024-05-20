import React from 'react';
import NewPageButton from './NewPageButton';
import VectorSearchBar from './VectorSearchBar';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";
import { useVerifyProjectAccess } from "../../utils/useVerifyProjectAccess";
import PageListButton from './PageListButton';
import SettingsButton from './SettingsButton';

const Header = () => {
  const location = useLocation();
  const projectId = extractProjectIdFromPath(location.pathname);
  const access = useVerifyProjectAccess(projectId);

  return (
    <header className='flex justify-between items-center fixed top-0 z-50 w-full bg-white bg-opacity-40 backdrop-blur-sm py-1 px-3'>
      <div className='flex items-center ml-4'>
        <PageListButton projectId={projectId} />
      </div>
      <div className='flex justify-center items-center flex-grow'>
        {access.isMember && <NewPageButton projectId={projectId} />}
        <VectorSearchBar projectId={projectId} />
      </div>
      <div className='flex items-center mr-4'>
        <SettingsButton projectId={projectId}/>
      </div>
    </header>
  );
};

export default Header;
