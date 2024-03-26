import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './display.css';

interface Page {
  _id: string;
  title: string;
  content: string;
  score?: number;
}

const SearchResults: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      fetchSearchResults(query);
    }
  }, [location.search]);

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const searchResults = await response.json();
      setPages(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="main-content">
      <div className='page-display'>
        {pages.length ? (
          pages.map(page => (
            <Link to={`/${page._id}`} key={page._id}>
              <div className="page">
                <div className="page-body">
                  <p className="page-title">{page.title}</p>
                  <p className="page-content">{page.content}</p>
                  {page.score && (
                      <p className="page-content score">
                        Score: {page.score.toFixed(5)}
                      </p>
                    )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-pages">
            <p>No search results found.</p>
          </div>
        )}
      </div>    
    </div>
  );
};

export default SearchResults;
