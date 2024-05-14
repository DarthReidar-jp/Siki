// PageItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../utils/types/types';

interface PageItemProps {
  page: Page;
}

const PageItem: React.FC<PageItemProps> = ({ page }) => (
<Link to={`/${page._id}`} key={page._id}>
    <div className="group relative flex flex-col bg-white border border-gray-200 transition-shadow duration-100 hover:bg-gray-200 aspect-square ">
      <div className="flex-1 p-2">
        <h3 className="text-xs font-bold mb-2 overflow-hidden line-clamp-2">{page.title}</h3>
        <p
          className="text-xs text-gray-500 overflow-hidden line-clamp-7"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        {typeof page.score === 'number' && page.score > 0 && (
          <p className="mt-2 text-blue-500 font-bold">
            Score: {page.score.toFixed(5)}
          </p>
        )}
      </div>
    </div>
  </Link>
);

export default PageItem;
