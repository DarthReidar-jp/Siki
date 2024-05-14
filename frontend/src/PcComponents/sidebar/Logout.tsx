import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/auth/useAuth';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <li onClick={handleLogout} className="px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer">
            Logout
        </li>
    );
};

export default LogoutButton;
