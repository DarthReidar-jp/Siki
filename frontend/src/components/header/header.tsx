import React from 'react';
import './header.css';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className='header'>
      <button className="custom-btn" onClick={onSidebarToggle}>=</button>
    </header>
  );
};

export default Header;
