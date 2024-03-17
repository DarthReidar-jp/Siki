// Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className='header'>
      <button className="custom-btn" onClick={onSidebarToggle}>=</button>
      <Link to="/new" className="custom-btn">+</Link>
      <form  className ='search-form' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
