// PageList.tsx
import React from 'react';
import { Page } from '../../utils/types';
import PageItem from './PageItem'; // 適切なパスに調整してください

interface PageListProps {
  pages: Page[];
}

const PageList: React.FC<PageListProps> = ({ pages }) => (
  <div className='page-list'>
    {pages.length ? (
      pages.map(page => (
        <PageItem key={page._id} page={page} />
      ))
    ) : (
      <div className="no-pages">
        <p>No pages found.</p>
      </div>
    )}
  </div>
);

export default PageList;
