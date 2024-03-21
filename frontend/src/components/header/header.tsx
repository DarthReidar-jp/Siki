// Header.tsx
import React from 'react';
import './header.css';
import SidebarToggleButton from './SidebarToggleButton';
import NewPageButton from './NewPageButton';
import VectorSearchForm from './VectorSearchForm';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className='header'>
      <SidebarToggleButton onClick={onSidebarToggle} />
      <NewPageButton />
      <VectorSearchForm />
    </header>
  );
};

export default Header;
