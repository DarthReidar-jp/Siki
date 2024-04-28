import React, { useState } from 'react';
import NewPageButton from './NewPageButton';
import VectorSearchForm from './VectorSearchForm';
import HamburgerMenu from './HamburgerMenu';
import Sidebar from '../sidebar/Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <header className='flex justify-between items-center fixed top-0 z-50 w-full bg-white bg-opacity-50 backdrop-blur-sm p-2'>
      <div className='flex justify-center items-center flex-grow'>
        <NewPageButton />
        <VectorSearchForm />
      </div>
      <HamburgerMenu toggleMenu={toggleSidebar} /> {/* Add the hamburger menu button */}
      <Sidebar isOpen={isSidebarOpen} closeMenu={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
