import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';


const LoginHeader = () => {
  return (
    <header className='header'>
      <Link to="/login" className="custom-btn">Login</Link> {/* ログインページへのリンク */}
      <Link to="/signup" className="custom-btn">Sign Up</Link> {/* サインアップページへのリンク */}
    </header>
  );
};

export default LoginHeader;
