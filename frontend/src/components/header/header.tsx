import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className='header'>
      <button className="custom-btn" onClick={onSidebarToggle}>=</button>
      <Link to="/new" className="custom-btn">+</Link>
    </header>
  );
};

export default Header;
