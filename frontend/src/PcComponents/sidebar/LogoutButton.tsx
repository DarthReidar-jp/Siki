import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/auth/useAuth'; // 正確なパスに注意

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
            ログアウト
        </li>
    );
};

export default LogoutButton;
