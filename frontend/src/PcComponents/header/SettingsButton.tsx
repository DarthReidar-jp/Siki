import React, { useState } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import Logout from './Logout';
import { ProjectIdProps } from '../../utils/types/types';
import Import from './Import';
import { useVerifyProjectAccess } from "../../utils/useVerifyProjectAccess";

const SettingsButton: React.FC<ProjectIdProps> = ({ projectId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const access = useVerifyProjectAccess(projectId);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className='relative'>
            <button onClick={toggleDropdown} className='p-2 rounded-full hover:bg-gray-200'>
                <IoSettingsSharp className='h-5 w-5' />
            </button>
            {isOpen && (
                <div className='absolute right-0 mt-2 py-2 w-48 rounded-md shadow-xl z-20 bg-white bg-opacity-90 backdrop-blur-sm'>
                    {access.isMember && <Import projectId={projectId} />}
                    <Logout />
                </div>
            )}
        </div>
    );
};

export default SettingsButton;
