import React from "react";
import { Link } from 'react-router-dom';

function TopPageButton() {
    return (
        <li><Link to="/" className="custom-link">トップページへ</Link></li>
    );
  }
  
  export default TopPageButton;