// components/sidebar/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import './sidebar.scss'
import TopPageButton from './TopPageButton';
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
    <div className={`sidebar ${isVisible ? 'active' : ''}`}>
      <ul>
        <TopPageButton />
        <FileImport />
      </ul>
    </div>
  );
}

export default Sidebar;
