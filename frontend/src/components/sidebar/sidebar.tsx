// components/sidebar/Sidebar.tsx
import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      {/* サイドバーの内容 */}
      <ul>
        <li>メニュー1</li>
        <li>メニュー2</li>
        <li>メニュー3</li>
      </ul>
    </div>
  );
}

export default Sidebar;
