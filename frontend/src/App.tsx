import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AppRoutes from './AppRoutes';
import Auth from './components/auth/Auth';
import HomeRoutes from './HomeRoutes';

function App() {
  const { isLoggedIn, isLoading } = Auth();
  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      {isLoggedIn ? 
        <div className='app'>
          <Header />
          <main className='content' >
            <Sidebar />
            <AppRoutes />
          </main>
        </div>
       : 
        <HomeRoutes />
      }
    </Router>
  );
};

export default App;