import { Link } from 'react-router-dom';

const HomeLink = () => (
    <Link to="/" className="block">
        <li className="px-5 py-1 text-sm hover:bg-gray-400 transition duration-300 cursor-pointer">
             My Page
        </li>
    </Link>
);

export default HomeLink;