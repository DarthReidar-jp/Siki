// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ローカルストレージ、またはバックエンドのAPIを呼び出してログイン状態をチェック
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const login = () => {
    // ログイン処理
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    // 実際にはここでバックエンドの認証処理を呼び出す
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: 'POST',
        credentials: 'include', // クッキーを含むリクエスト
      });
      setIsLoggedIn(false); // ログアウト成功後に状態を更新
      localStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/current_user", {
        credentials: 'include', // クッキーをリクエストに含める
      });
      const data = await response.json();
      if (data.isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Auth status check failed", error);
      setIsLoggedIn(false);
    }
  };
  
  useEffect(() => {
    checkAuthStatus();
  }, []);
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


