import React from 'react';
import "./home.css";

function Home() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };
  return (
    <div className='center'>
      <h1>Googleでログインしてください</h1>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Home;