import React from "react";
import { Link } from 'react-router-dom';

const TopPageButton = () => (
    <li className="px-5 py-3 hover:bg-blue-900 transition duration-300 cursor-pointer">
        <Link to="/chat" className="block">
            chat
        </Link>
    </li>
);

export default TopPageButton;