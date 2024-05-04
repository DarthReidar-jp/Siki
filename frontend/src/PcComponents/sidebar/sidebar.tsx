import { useState, useEffect } from 'react';
import TopPageButton from './TopPageButton';
import ChatButton from './ChatButton';
import FileImport from './FileImport';
import Logout from'./LogoutButton';

const Sidebar = () => {
  // サイドバーの表示状態を管理するための状態変数
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const shouldShowSidebar = e.clientX < 20;
      const shouldHideSidebar = isVisible && e.clientX > 180;

      if (shouldShowSidebar) setIsVisible(true);
      else if (shouldHideSidebar) setIsVisible(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);
  return (
    <div className={`fixed top-12 left-0 w-60 bottom-12 bg-gray-300 z-50 bg-opacity-80 backdrop-blur-sm transition-transform duration-300 overflow-y-auto ${isVisible ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}>
      <ul className="text-gray-600 py-5">
        <TopPageButton />
        <ChatButton />
        <FileImport />
        <Logout />
      </ul>
    </div>
  );
}

export default Sidebar;
