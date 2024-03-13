import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/home/home';
import AuthSuccess from './components/auth/AuthSuccess'; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className='app'>
        <Header onSidebarToggle={handleSidebarToggle}/>
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            {/* ログイン状態に基づいたルーティング */}
            {isLoggedIn ? (
              <>
                <Route path="/" element={
                  <>
                    <Sidebar />
                    <Display />
                  </>
                } />
              </>
            ) : (
              <Route path="/" element={<Home />} />
            )}
            <Route path="/auth/success" element={<AuthSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
