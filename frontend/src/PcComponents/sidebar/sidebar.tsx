// components/sidebar/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import TopPageButton from './TopPageButton';
import ChatButton from './ChatButton';
import FileImport from './FileImport';

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
    <div className={`fixed top-12 left-0 bottom-0 bg-gray-400 z-50 bg-opacity-80 backdrop-blur-sm transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}>
      <ul className="text-white py-5">
        <TopPageButton />
        <FileImport />
        <ChatButton />
      </ul>
    </div>
  );
}

export default Sidebar;
