import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  onSidebarToggle: () => void;
  onLogout: () => void; // ログアウト関数をpropsとして受け取る
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, onLogout }) => {
  return (
    <header className='header'>
      <button className="custom-btn" onClick={onSidebarToggle}>=</button>
      <Link to="/new" className="custom-btn">+</Link>
      <button className="custom-btn" onClick={onLogout}>Log Out</button> {/* ログアウト関数を呼び出す */}
    </header>
  );
};

export default Header;
