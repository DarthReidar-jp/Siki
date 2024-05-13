import React from 'react';
import PageItem from './PageItem';
import { PageListProps } from '../../utils/types/types';

const PageList: React.FC<PageListProps> = ({ pages,projectId }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 p-5 px-12">
    {pages.length ? (
      pages.map(page => (
        <PageItem key={page._id} page={page} projectId={projectId}  />
      ))
    ) : (
      <div className="col-span-full text-center">
        <p>No pages found.</p>
      </div>
    )}
  </div>
);

export default PageList;
