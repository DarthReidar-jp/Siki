import React from 'react';

interface SortSelectProps {
    sort: string;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortSelectProps> = ({ sort, onSortChange }) => (
    <div className="flex justify-end p-0 px-12 pt-5">
        <select onChange={onSortChange} value={sort} className="sort-select border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <option value="createdAsc">作成日順</option>
            <option value="updatedDesc">更新日順</option>
            <option value="titleAsc">タイトル (A-Z)</option>
            <option value="titleDesc">タイトル (Z-A)</option>
        </select>
    </div>
);

export default Sort;
