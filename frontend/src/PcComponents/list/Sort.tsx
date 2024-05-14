import React from 'react';
import { FaSort } from "react-icons/fa";
import { SortSelectProps } from '../../utils/types/types';

const Sort: React.FC<SortSelectProps> = ({ sort, onSortChange }) => (
    <div className="flex justify-end px-12 pt-5">
        <div className="relative">
            <select
                onChange={onSortChange}
                value={sort}
                className="border border-gray-300 bg-white  rounded-md py-2 px-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
                <option value="updatedDesc">更新日順</option>
                <option value="createdAsc">作成日順</option>
                <option value="titleAsc">タイトル (A-Z)</option>
                <option value="titleDesc">タイトル (Z-A)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                <FaSort />
            </div>
        </div>
    </div>
);

export default Sort;
