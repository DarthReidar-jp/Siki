import React from "react";
import { Link } from 'react-router-dom';

interface SidebarActionProps {
    closeSidebar: () => void;
  }

const TopPageButton:React.FC<SidebarActionProps> = ({ closeSidebar }) => (
    <li className="font-medium text-lg hover:text-gray-300 cursor-pointer transition-colors duration-200" onClick={closeSidebar}>
        <Link to="/" className="block">トップページへ</Link>
    </li>
);

export default TopPageButton;
