import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css'

const NewPage = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (title.trim().length > 0) {
      try {
        const response = await fetch('http://localhost:8000/api/page', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, lines: [title] }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Page created:', result);
          navigate(`/${result.page._id}`);
        } else {
          console.error('Failed to create page');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(); 
    }
  };

  return (
    <div className="container">
      <div className="page-diteil">
        <div className='page-diteil-body'>
          <input
            className='title'
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            placeholder="タイトルを入力"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPage;
