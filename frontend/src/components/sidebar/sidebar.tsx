// components/sidebar/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" className="custom-link">トップページへ</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
