import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Page from './components/page/Page';
import NewPage from './components/page/NewPage';
import Home from './components/home/Home';

function RoutesWithAuth() {
  const { isLoggedIn } = useAuth(); // ログイン状態をAuthContextから取得

  if (isLoggedIn) {
    // ログインしている場合のルート
    return (
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/:id" element={<Page />} />
        <Route path="/new" element={<NewPage />} />
      </Routes>
    );
  } else {
    // ログインしていない場合のルート
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  }
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className='app'>
          <Header onSidebarToggle={handleSidebarToggle} />
          <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar />
            <RoutesWithAuth />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
