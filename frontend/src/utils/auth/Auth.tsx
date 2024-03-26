import { useState, useEffect } from 'react';

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus()
      .then(isLoggedIn => {
        setIsLoggedIn(isLoggedIn);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('ログイン状態の確認中にエラーが発生しました:', error);
        setIsLoading(false);
      });
  }, []);

  const checkLoginStatus = async () => {
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
  };

  return { isLoggedIn, isLoading };
};

export default Auth;