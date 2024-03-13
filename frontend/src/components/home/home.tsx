import React from 'react';

function Home() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };
  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Home;