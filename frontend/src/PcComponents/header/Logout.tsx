import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/auth/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <div onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Logout
        </div>
    );
};

export default Logout;
