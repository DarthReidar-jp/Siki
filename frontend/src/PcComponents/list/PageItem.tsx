import React from 'react';
import { Link } from 'react-router-dom';
import { PageItemProps } from '../../utils/types/types';

const PageItem: React.FC<PageItemProps> = ({ page, projectId }) => {
  const linkPath = projectId ? `/project/${projectId}/${page._id}` : `/page/${page._id}`;
  return (
    <Link to={linkPath} key={page._id}>
      <div className="group relative flex flex-col bg-white border border-gray-200 transition-shadow duration-100 hover:bg-gray-200 h-40">
        <div className="flex-1 p-2.5">
          <h3 className="text-xxs font-bold text-gray-800 mb-2 overflow-hidden line-clamp-2">{page.title}</h3>
          <p
            className="text-xxxs text-gray-400 overflow-hidden line-clamp-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
          {typeof page.score === 'number' && page.score > 0 && (
            <p className="mt-2 text-blue-500">
              Score: {page.score.toFixed(5)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
};

export default PageItem;
