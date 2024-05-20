import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";

const SearchProject = () => {
    const [projectId, setProjectId] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/project/${projectId}`);
    };

    return (
        <div className="px-5 pt-1">
            <form onSubmit={handleSearch} className="">
                <label htmlFor="projectName" className="text-gray-700 text-xs">プロジェクト検索</label>
                <div className='flex items-center gap-2'>
                    <input
                        type="text"
                        placeholder="プロジェクトIDを入力"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="flex-grow p-1 border border-solid border-gray-300  bg-white focus:outline-none focus:border-blue-300 rounded text-xxs"
                    />
                    <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-1 rounded text-xxxs transition duration-150 ease-in-out">
                        <GrSearch />
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SearchProject;
