// components/sidebar/Sidebar.tsx
import React from 'react';
import './sidebar.css'
import TopPageButton from './TopPageButton';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <TopPageButton />
      </ul>
    </div>
  );
}

export default Sidebar;
