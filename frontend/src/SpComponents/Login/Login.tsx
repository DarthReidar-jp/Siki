import React from 'react';
import "./Login.css";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };
  return (
    <div className='center'>
      <h1>Googleでログインしてください</h1>
      <p>スマホだよ</p>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Login;