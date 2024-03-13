//App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/home/home';
import NewPage from './components/page/NewPage';
import AuthSuccess from './components/auth/AuthSuccess'; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Router>
      <div className='app'>
        <Header onSidebarToggle={handleSidebarToggle}/>
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/auth/success" element={<AuthSuccess onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/" element={
                  <>
                    <Sidebar />
                    <Display />
                  </>
                } />
                <Route path="/new" element={
                  <>
                    <NewPage />
                  </>
                } />
              </>
            ) : (
              <Route path="/" element={<Home />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

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

export default App;
