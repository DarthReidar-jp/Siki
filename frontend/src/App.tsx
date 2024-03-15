import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/home/home';
import NewPage from './components/page/NewPage';
import Page from './components/page/Page';
import AuthSuccess from './components/auth/AuthSuccess';
import Search from './components/display/SearchResults'

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

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className='app'>
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar />
          <Routes>
            <Route path="/auth/success" element={<AuthSuccess onLogin={setIsLoggedIn} />} />
            <Route path="/" element={<Display />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/:id" element={<Page />} />
            <Route path="/search" element={<Search />} />
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
