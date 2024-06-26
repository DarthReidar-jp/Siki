import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";
import { ProjectIdProps } from '../../utils/types/types';

const VectorSearchBar: React.FC<ProjectIdProps> = ({ projectId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(projectId);
      const url = projectId
        ? `/project/${projectId}/search?query=${encodeURIComponent(searchQuery)}&projectId=${projectId}`
        : `/search?query=${encodeURIComponent(searchQuery)}`;
      console.log(url);
      navigate(url);
    }
  };

  return (
    <form className='relative w-full max-w-lg bg-gray-300 rounded-lg overflow-hidden' onSubmit={handleSearch}>
      <input
        type="text"
        className="w-full h-8 pl-4 pr-10 text-xs bg-transparent focus:outline-none"
        placeholder="VectorSearch..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="VectorSearch"
      />
      <button type="submit" className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-white bg-transparent hover:text-gray-500 transition duration-300" aria-label="Submit search">
        <GrSearch />
      </button>
    </form>
  );
};

export default VectorSearchBar;
