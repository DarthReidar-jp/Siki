import React from "react";
import { Link } from 'react-router-dom';

const TopPageButton = () => (
    <Link to="/chat" className="block">
        <li className="px-5 py-3 hover:bg-gray-400 transition duration-300 cursor-pointer">
            Let's Chat!
        </li>
    </Link>
);

export default TopPageButton;