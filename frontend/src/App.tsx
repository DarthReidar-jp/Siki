import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AppRoutes from './AppRoutes';
import Auth from './components/auth/Auth';
import HomeRoutes from './HomeRoutes';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { isLoggedIn, isLoading } = Auth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      {isLoggedIn ? 
        <div className='app'>
          <Header onSidebarToggle={handleSidebarToggle} />
          <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
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