import { Link } from 'react-router-dom';

const TopPageButton = () => (
    <Link to="/" className="block">
        <li className="px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer">
            トップページへ
        </li>
    </Link>
);

export default TopPageButton;