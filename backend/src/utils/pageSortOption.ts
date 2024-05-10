
import { SortOrder } from 'mongoose';

// ソートオプションを解析する関数
export const parseSortOption = (sortOption: string | undefined): { [key: string]: SortOrder } => {
    switch (sortOption) {
      case 'createdAsc': return { createdAt: 1 };
      case 'updatedDesc': return { updatedAt: -1 };
      case 'titleAsc': return { title: 1 };
      case 'titleDesc': return { title: -1 };
      default: return { createdAt: -1 };
    }
};