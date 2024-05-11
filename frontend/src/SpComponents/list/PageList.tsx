// PageList.tsx
import React from 'react';
import { Page } from '../../utils/types/types';
import PageItem from './PageItem'; // 適切なパスに調整してください

interface PageListProps {
  pages: Page[];
}

const PageList: React.FC<PageListProps> = ({ pages }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 p-5 px-1">
    {pages.length ? (
      pages.map(page => (
        <PageItem key={page._id} page={page} />
      ))
    ) : (
      <div className="col-span-full text-center">
        <p>No pages found.</p>
      </div>
    )}
  </div>
);

export default PageList;
