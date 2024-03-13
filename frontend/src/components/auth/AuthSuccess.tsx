//AuthSuccess.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthSuccessProps {
  onLogin: (isLoggedIn: boolean) => void;
}

function AuthSuccess({ onLogin }: AuthSuccessProps) {
  const navigate = useNavigate();
  useEffect(() => {
    checkLoginStatus().then(isLoggedIn => {
      onLogin(isLoggedIn);
      navigate('/');
    });
  }, [navigate, onLogin]);

  return <div>ログイン状態を確認中...</div>;
}

async function checkLoginStatus() {
  try {
    const response = await fetch('http://localhost:8000/api/auth/verify', {
      method: 'GET',
      credentials: 'include', 
    });
    if (response.ok) {
      const data = await response.json();
      return data.isLoggedIn;
    }
    return false;
  } catch (error) {
    console.error('ログイン状態の確認中にエラーが発生しました:', error);
    return false;
  }
}
export default AuthSuccess;
