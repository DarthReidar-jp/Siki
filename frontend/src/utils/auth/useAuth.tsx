import { useState, useEffect } from 'react';

// カスタムフックの命名規則に従って関数名をuseAuthに変更
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ログイン状態を確認する処理を直接useEffect内で実行
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
        // 成功時も失敗時もisLoadingをfalseに設定
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, isLoading };
};

export default useAuth;
