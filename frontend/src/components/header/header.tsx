import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      auth.logout();
    } else {
      // 適切なエラーハンドリング
      console.error('Authentication context not available');
    }
  };

  return (
    <header className='header'>
      <button className="custom-btn" onClick={onSidebarToggle}>=</button>
      <Link to="/new" className="custom-btn">+</Link>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
