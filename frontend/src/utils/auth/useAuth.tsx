// src/hooks/useAuth.js (または.tsxなど、適切な場所に)

import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}auth/verify`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      }
    } catch (error) {
      console.error('ログイン状態の確認中にエラーが発生しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ログアウト機能
  const logout = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      await fetch(`${backendUrl}auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      setIsLoggedIn(false);  // 状態を未ログインに更新
    } catch (error) {
      console.error('ログアウト時にエラーが発生しました:', error);
    }
  };

  return { isLoggedIn, isLoading, logout };
};

export default useAuth;
