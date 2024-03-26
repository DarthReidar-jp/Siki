import React from 'react';

interface SortSelectProps {
    sort: string;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ sort, onSortChange }) => (
    <div className="sort-container">
        <select onChange={onSortChange} value={sort} className="sort-select">
            <option value="createdAsc">作成日順</option>
            <option value="updatedDesc">更新日順</option>
            <option value="titleAsc">タイトル (A-Z)</option>
            <option value="titleDesc">タイトル (Z-A)</option>
        </select>
    </div>
);

export default SortSelect;
