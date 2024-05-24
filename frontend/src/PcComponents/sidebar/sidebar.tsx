import { useState, useEffect } from 'react';
import MyPageLink from './HomeLink';
import CreateProject from './CreateProject';
import SearchProject from './SearchProject';
import ProjectsList from './ProjectsList';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const shouldShowSidebar = e.clientX < 20;
      const shouldHideSidebar = isSidebarVisible && e.clientX > 250;

      if (shouldShowSidebar) setIsSidebarVisible(true);
      else if (shouldHideSidebar) setIsSidebarVisible(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSidebarVisible]);

  return (
    <div className={`fixed top-12 left-3 w-60 bottom-12 rounded-lg bg-gray-300 z-50 bg-opacity-80 backdrop-blur-sm transition-transform duration-300 overflow-y-auto ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}>
      <ul className="text-gray-600 py-5">
        <MyPageLink />
        <CreateProject />
        <SearchProject />
        <ProjectsList />
      </ul>
    </div>
  );
}

export default Sidebar;
