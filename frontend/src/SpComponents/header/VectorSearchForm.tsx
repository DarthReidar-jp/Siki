import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      <form className='search-container' onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit"><GrSearch /></button>
      </form>
    </div>

  );
};

export default SearchForm;
