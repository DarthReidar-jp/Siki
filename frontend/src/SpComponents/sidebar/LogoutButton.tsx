import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/auth/useAuth'; // 正確なパスに注意

interface SidebarActionProps {
    closeSidebar: () => void;
  }

const LogoutButton:React.FC<SidebarActionProps> = ({ closeSidebar }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        closeSidebar(); // Close sidebar before navigating and reloading
        navigate('/');
        window.location.reload(); // Consider whether a reload is necessary here if navigate does the job
    };

    return (
        <li onClick={handleLogout} className="font-medium text-lg hover:text-gray-300 cursor-pointer transition-colors duration-200">
            ログアウト
        </li>
    );
};

export default LogoutButton;
