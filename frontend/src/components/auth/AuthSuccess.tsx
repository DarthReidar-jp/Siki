import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus().then(isLoggedIn => {
      if (isLoggedIn) {
        localStorage.setItem('loggedIn', 'true');
      } else {
        localStorage.removeItem('loggedIn');
      }
      navigate('/');
    });
  }, [navigate]);

  return <div>ログイン状態を確認中...</div>;
}

async function checkLoginStatus() {
  try {
    const response = await fetch('http://localhost:8000/api/auth/verify', {
      method: 'GET',
      credentials: 'include', // クッキーをリクエストに含める
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
