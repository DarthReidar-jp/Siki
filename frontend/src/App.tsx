// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import LoginHeader from './components/header/LoginHeader';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Page from './components/page/Page';
import NewPage from './components/page/NewPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Home from './components/home/home';
import { getToken, removeToken } from './utils/storage';
import { TokenVerification} from './api/auth';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);;

  useEffect(() => {
    const initAuthState = async () => {
      const token = getToken();
      if (token) {
        try {
          // トークンの有効性を確認
          await TokenVerification(token);
          setIsLoggedIn(true);
        } catch (error) {
          removeToken(); // トークンが無効ならローカルストレージから削除
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    initAuthState();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logout = () => {
    removeToken(); // トークンを削除
    setIsLoggedIn(false); // ログイン状態をfalseに設定
  };
  
  if (isLoggedIn === null) {
    // ログイン状態が未定（トークン確認中）の場合、ローディング表示や空のdivを返す
    return <div>Loading...</div>; // 実際にはよりユーザーフレンドリーなローディング表示を実装する
  }
    
  return (
    <Router> {/* RouterでAppコンポーネントをラップ */}
      <div className='app'>
        {isLoggedIn ? (      
           <Header onSidebarToggle={handleSidebarToggle} onLogout={logout} />
        ) : (
          <LoginHeader /> 
        )}
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar />
          <Routes>
            {isLoggedIn ? (
              <>
                {/* ログイン時に表示するページ */}
                <Route path="/" element={<Display />} />
                <Route path="/:id" element={<Page />} />
                <Route path="/new" element={<NewPage />} />
              </>
            ) : (
              <>
                {/* ログインしていない時に表示するページ */}
                <Route path="/" element={<Home />} /> {/* ログイン前のトップページ */}
                <Route path="/login" element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />
                <Route path="/signup" element={<SignupForm onSignupSuccess={() => setIsLoggedIn(true)} />} />
              </>
            )}
            {/* 共通ページ */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
