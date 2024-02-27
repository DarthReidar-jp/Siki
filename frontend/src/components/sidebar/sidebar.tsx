// components/sidebar/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      {/* サイドバーの内容 */}
      <ul>
        <li><Link to="/new" className="custom-link">新しいページを作成</Link></li>
        <li><Link to="/" className="custom-link">トップページへ</Link></li>
        <li>メニュー3</li>
      </ul>
    </div>
  );
}

export default Sidebar;
