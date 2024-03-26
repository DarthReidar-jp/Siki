// PageItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../types';

interface PageItemProps {
  page: Page;
}

const PageItem: React.FC<PageItemProps> = ({ page }) => (
  <Link to={`/${page._id}`} key={page._id}>
    <div className="page">
      <div className="page-body">
        <p className="page-title">{page.title}</p>
        <p className="page-content">{page.content}</p>
      </div>
    </div>
  </Link>
);

export default PageItem;
