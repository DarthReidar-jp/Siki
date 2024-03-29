import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchQuery.trim()) { // 空白のみの検索を防ぐ
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form className='search-container' onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..." // プレースホルダーの追加でユーザーエクスペリエンス向上
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search" // アクセシビリティ向上のためにaria-labelを追加
      />
      <button type="submit" aria-label="Submit search"> {/* アクセシビリティ向上のためにaria-labelを追加 */}
        <GrSearch />
      </button>
    </form>
  );
};

export default SearchForm;
