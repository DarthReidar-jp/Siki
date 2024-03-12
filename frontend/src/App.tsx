// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Page from './components/page/Page';
import NewPage from './components/page/NewPage';
import Home from './components/home/Home';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ローカルストレージからログイン状態をチェック
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleGoogleLogin = async () => {
    // GoogleのOAuth認証ページへリダイレクトする
    window.location.href = `http://localhost:8000/api/auth/google`;
    // ログイン成功後にローカルストレージの状態を更新することを想定
  };

  return (
    <Router>
      <div className='app'>
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar />
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Display />} />
                <Route path="/:id" element={<Page />} />
                <Route path="/new" element={<NewPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home onLogin={handleGoogleLogin} />} />
                {/* ログインしていない場合、すべてのルートをHomeにリダイレクト */}
                <Route path="*" element={<Navigate replace to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
