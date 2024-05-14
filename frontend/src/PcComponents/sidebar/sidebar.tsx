import { useState, useEffect } from 'react';
import HomeLink from './HomeLink';
import FileImport from './FileUploader';
import Logout from'./Logout';
import ProjectsList from './ProjectsList';
import ChatLink from './ChatLink';
import { useLocation } from 'react-router-dom';
import { extractProjectIdFromPath } from "../../utils/extractProjectId";
import { useVerifyProjectAccess } from "../../utils/useVerifyProjectAccess";

const Sidebar = () => {
  // サイドバーの表示状態を管理するための状態変数
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation();
  const projectId = extractProjectIdFromPath(location.pathname) || undefined;
  const access = useVerifyProjectAccess(projectId);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const shouldShowSidebar = e.clientX < 20;
      const shouldHideSidebar = isSidebarVisible && e.clientX > 180;

      if (shouldShowSidebar) setIsSidebarVisible(true);
      else if (shouldHideSidebar) setIsSidebarVisible(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSidebarVisible]);

  return (
    <div className={`fixed top-12 left-0 w-60 bottom-12 bg-gray-300 z-50 bg-opacity-80 backdrop-blur-sm transition-transform duration-300 overflow-y-auto ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}>
      <ul className="text-gray-600 py-5">
        <HomeLink />
        <ProjectsList />
        <ChatLink projectId={projectId} />
        {access.isMember &&<FileImport projectId={projectId} />}
        <Logout />
      </ul>
    </div>
  );
}

export default Sidebar;
