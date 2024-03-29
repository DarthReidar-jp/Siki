import React from 'react';
import "./Login.scss";

const Login = () => {
  const handleGoogleLogin = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    window.location.href = `${backendUrl}auth/google`;
  };

  return (
    <div className='center'>
      <h1>Googleでログインしてください</h1>
      <button className='button' onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Login;
