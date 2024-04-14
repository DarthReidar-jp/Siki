// Header.tsx
import React from 'react';
import './header.scss';
import NewPageButton from './NewPageButton';
import VectorSearchForm from './VectorSearchForm';

const Header = () => {
  return (
    <header className='header'>
      <div className='center-container'>
        <NewPageButton />
        <VectorSearchForm />
      </div>
    </header>
  );
};

export default Header;
