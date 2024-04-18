import React from "react";
import { Link } from 'react-router-dom';

const TopPageButton = () => (
    <li><Link to="/chat" className="custom-link">chat</Link></li>
);

export default TopPageButton;