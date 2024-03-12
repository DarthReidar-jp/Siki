// Home.tsx
import React  from 'react';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const auth = useAuth();

  const handleLogin = () => {
    if (auth) {
      auth.login();
    } else {
      // 適切なエラーハンドリング
      console.error('Authentication context not available');
    }
  };
  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Home;
