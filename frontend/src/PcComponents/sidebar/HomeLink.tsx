import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

const MyPageLink = () => (
    <Link to="/" className="block">
        <li className="flex items-center px-5 py-1 text-sm hover:bg-gray-400 transition duration-300 cursor-pointer">
            <IoHome className='mr-1 text-sm'/>  
            My Page
        </li>
    </Link>
);

export default MyPageLink;
