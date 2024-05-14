import { Link } from 'react-router-dom';

const HomeLink = () => (
    <Link to="/" className="block">
        <li className="px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer">
            Page List
        </li>
    </Link>
);

export default HomeLink;